import React from 'react'
import { useDispatch } from 'react-redux';
import service from '../../Appwrite/Auth_Service';
import { logout } from '../../Store/Auth_Slice';
function LogoutBtn() {
  
const dispatch=useDispatch();
const LogoutHandler=()=>{
  service.Logout()
  .then(()=>{
    dispatch(logout())
  })
}

return (
  <Button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</Button>
  )
}

export default LogoutBtn
