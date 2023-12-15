import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { login,logout } from './Store/Auth_Slice';
import service from './Appwrite/Auth_Service'
import { Footer, Header } from './Components/Index';

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    service.GetUserAccount()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
 return !loading ? (
 <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
    <Header></Header>
    <Footer></Footer>
  </div>
 </div>
 )
 :(<div>Please Login</div>)
}

export default App
