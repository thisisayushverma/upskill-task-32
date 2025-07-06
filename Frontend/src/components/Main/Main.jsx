import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();
    const [user,setUser] = useState(null)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const fetchData = async ()=>{
        const token = localStorage.getItem("auth-key");
        if(token===null){
            navigate('/login')
            return;
        }
        console.log("token is present");
        const userData = await fetch(`${backendUrl}/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':token
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.success === false){
                navigate('/login')
                return
            }
            setUser(data.user)
        })
        .catch((error)=>{
            console.log(error);
            navigate('/login')
        })
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='p-5'>
      <h1>
        Your are on main page
      </h1>
      {
        user && (
            <div>
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
            </div>
        )
      }

      <div>
        <button onClick={() => navigate('/upload')} className='bg-blue-500 font-bold text-2xl p-3 m-2 rounded-md'>
            <Link to="/upload">Upload</Link>
        </button>
        <button onClick={() => navigate('/read')} className='bg-blue-500 font-bold text-2xl p-3 m-2 rounded-md'>
            <Link to="/upload">Read</Link>
        </button>
      </div>
    </div>

  )
}

export default Main
