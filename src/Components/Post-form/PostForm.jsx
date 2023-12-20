import React,{useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import {Button,Select,Input,RTE} from '../Index'
import File from '../../Appwrite/File_Service'
import DatabaseService from '../../Appwrite/Database_Service'
import { useNavigate } from 'react-router-dom'
function PostForm({post}) {
 const navigate=useNavigate()
 const UserData=useSelector(state=>state.Auth.UserData)
 const {watch,register,handleSubmit,setValue,getValues,control}=useForm({
    defaultValues:{
        Title:post?.Title || '',
        Slug:post?.Slug || '',
        Status:post?.Status || 'active',
        Content:post?.Content || '',
    }
 })
 const submit=async(data)=>{
    if(post){
        const file=data.Image[0]?File.UploadFile(data.Image[0]) :null
        if(file){
            File.DeleteFile(post.Image)
        }
        const EditedPost=await DatabaseService.UpdatePost(post.$id,{...data, Image: file? file.$id:undefined})
        if(EditedPost) navigate(`/post/${EditedPost.$id}`)
    }else{
        const file=await File.UploadFile(data.Image[0])
        if(file){
            const FileId=file.$id
            data.Image=FileId
            const NewPost=await DatabaseService.CreatePost({...data, UserId:UserData.$id})
            if(NewPost) navigate(`/post/${NewPost.$id}`)
        }
    }
 }
const SlugTransform=useCallback((value)=>{
    if(value && typeof value ==='string'){
        return value.trim().toLowerCase().replace(/^[a-zA-z\d\s]+/g, '-').replace(/\s/g,'-');
    }
},[])
 useEffect(()=>{
    const subscription=watch((value,{name})=>{
        if(name ==='Title'){
            setValue('Slug', SlugTransform(value.Title,{shouldValidate:true}))
        }
    })

    return ()=>{
        subscription.unsubscribe()
    }
 },[watch,setValue,SlugTransform])
  return (
   <form onSubmit={handleSubmit(submit)}>
    <div className='w-2/3 px-2'>
        <Input
        label='Title: '
        placeholder='Enter Title'
        className='mb-4'
        {...register('Title',{required:true})}
        ></Input>
        <Input
        label='Slug:'
        placeholder='Enter Slug'
        className='mb-4'
        {...register('Slug',{required:true})}
        onInput={(e)=>{setValue('Slug',SlugTransform(e.currentTarget.value),{shouldValidate:true})}}
        ></Input>
        <RTE 
        label='Content:'
        name='Content'
        control={control}
        defaultvalue={getValues('content')}
        ></RTE>
    </div>
    <div className='w-2/3'>
        <Input
        label='Image: '
        type='file'
        accept='Image/jpg, Image/png, Image/gif, Image/jpeg'
        {...register('Image',{required:!post})}
        ></Input>
        {post && (
            <div className='w-full mb-4'>
                <img className='rounded-lg' src={File.FilePreview(post.Image)} alt={post.Title} />
            </div>
        )}
        <Select
        label='Status: '
        Options={['active','inactive']}
        className='mb-4'
        {...register('Status',{required:true})}
        ></Select>
        <Button
        type='submit'
        bgcolor={post?'bg-green-500':undefined}
        className='w-full'
        >{post?'Update':'Submit'}</Button>
    </div>
   </form>
  )
}

export default PostForm
