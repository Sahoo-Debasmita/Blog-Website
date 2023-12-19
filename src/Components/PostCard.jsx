import React from 'react'
import File from '../Appwrite/File_Service'
import { Link } from 'react-router-dom'
function PostCard({$id,title,Image}) {
  return (
    <Link to={`posts/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
        <img src={File.FilePreview(Image)} alt={title} className='rounded-xl' />
        </div>
      </div>
      <h2 className='text-xl font-bold'>{title}</h2>
    </Link>
  )
}

export default PostCard
