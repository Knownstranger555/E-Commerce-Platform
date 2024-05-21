// import React from 'react'

import React,{useState,useEffect} from 'react'
// ab uski value ke liye state lgayenge

import {useNavigate} from 'react-router-dom'


export default function SignUp() {

  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")

  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  })

  // const collectData=()=>{
  //   console.warn(name,password,email)
  // }
  const collectData= async ()=>{
    console.warn(name,password,email)
    // abhi humkko api se connect krna hain isko

    // let result =await fetch('url of api',{type,body,headers})
    let result =await fetch('http://localhost:5000/register',{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      },

    });
    result =await result.json()
    console.warn(result);
  
    localStorage.setItem("user",JSON.stringify(result))
    // saves in local storage, stays on there, even if u close the browser
    localStorage.setItem("token", JSON.stringify(result.auth))
    

    if(result){
      navigate('/')
    }

  }

  return (
    <div className="login">
        <h1>Register</h1>
        <input className="inputBox" type="text" 
        value={name} onChange={(e)=>setName(e.target.value)}
        placeholder="enter name"/>

        <input className="inputBox" type="text" 
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="enter email"/>

        <input className="inputBox" type="password" 
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="enter password"/>
        {/* type="password" isse enterd value is cant be seen  */}

        <button type="button" className ="appbutton"
        onClick={collectData}
        >Sign Up</button>
    </div>
  )
}
