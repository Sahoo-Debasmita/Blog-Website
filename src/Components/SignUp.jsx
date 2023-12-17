import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as LoginSlice, login } from '../Store/Auth_Slice'
import service from '../Appwrite/Auth_Service'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {Logo,Input,Button} from './Index'

function SignUp() {
    const Navigate=useNavigate();
    const Dispatch=useDispatch();
    const [error,setError]=useState('');
    const {register,handleSubmit}=useForm();

    const Create=async(data)=>{
        setError("");
        try {
            const UserData=await service.CreateAccount(data);
            if(UserData) {
                const UserData=await service.GetUserAccount(UserData);
                if(UserData) Dispatch(login(UserData))
                Navigate('/')
            }
        } catch (error) {
            setError(error.message)            
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'><Logo width='100%'></Logo></span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
           Already have any account?&nbsp;
            <Link to='/login' className='font-medium transition-all duration-200 hover:underline'>Sign In</Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(Create)}>
            <div className='space-y-5'>
            <Input 
            label='Full Name'
            type='text'
            placeholder='Enter Your Full Name...'
            {...register('name',{required:true})}
            ></Input>
             <Input 
              label='Email'
              placeholder='Enter Email:'
              {...register('email',{
                required:true,
                validate:{
                  matchPattern:(value)=>{
                    /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm.test(value) || 'Enter a valid Email address'
                  }
                }
              })}
              ></Input>
              <Input 
              label='Password'
              type='password'
              placeholder='Enter a Password'
              {...register('password',{
                required:true,
                validate:{
                  matchPattern:(value)=>{
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || 'Enter Correct Password'
                  }
                }
              })}
              ></Input>
              <Button
              type='submit'
              className='w-full'
              >Create Account</Button>
              </div>
        </form>
        </div>
    </div>
  )
}

export default SignUp
