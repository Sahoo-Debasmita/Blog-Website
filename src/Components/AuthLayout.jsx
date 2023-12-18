import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protect({children,authentication=true}) {
    const navigate=useNavigate();
    const AuthStatus=useSelector(state=>state.Auth.status);
    const [loader, setLoader]=useState(true);

    useEffect(()=>{
        if(authentication && AuthStatus !==authentication){
            navigate('/login');
        }else if(!authentication && AuthStatus !==authentication){
            navigate('/');
        }
        setLoader(false);
    },[navigate,AuthStatus,authentication])

  return loader ? <h1>Loading...</h1>:<>{children}</>
}


