"use client";
import React, { useRef, useState } from "react";
import "../css/Signup.css";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import dotenv from "dotenv";
import Loading from "./Loading";


dotenv.config();

const Signup = () => {
  const [loading,setLoading]=useState(false);
  const [checkPassword, setCheckPassword] = useState({
    show: false,
    content: "Show",
    type: "password",
  });
  const [credential, setCredential] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const[avatar,setAvatar]=useState("");

  const showPassword = (e: any): void => {
    e.preventDefault();
    if (checkPassword.show === false) {
      setCheckPassword({ show: true, content: "Hide", type: "text" });
    } else {
      setCheckPassword({ show: false, content: "Show", type: "password" });
    }
  };

  const changeData = (e: any) => {
      setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const imageChange=async(e:any)=>{
    const file=e.target.files[0];
    if(file){
      setAvatar(file);
    }
  }

  const handleData=async(e:any)=>{
    e.preventDefault();
    setLoading(true);
      const formImage=new FormData();
    formImage.append('file',avatar);
    formImage.append('upload_preset', 'r3ldobdk');
    const imageUrl=await fetch(`https://api.cloudinary.com/v1_1/dbcezfmni/image/upload`,{
      method:'POST',
      body:formImage,
    })
    const res=await imageUrl.json(); 
    const response=await fetch(`${process.env.WEBSITE}/api/user/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({username:credential.username,password:credential.password,name:credential.name,email:credential.email,avatar:res.url}),
    })
    const responseData=await response.json();
    alert(responseData.message);
    if(responseData.message==="Signed Up. Moving to Login"){
      window.location.href='/';
    }
    else{
      setLoading(false);
    }
  
  }

  return (
    loading?<Loading/>:
    <div className="signup">
      <div className="signup-image">
        <FaTwitter />
      </div>
      <div className="signup-content">
        <p>
          <b>Create your Account</b>
        </p>
        <div className="signup-data">
          <label>Name</label>
          <input onChange={(e) => changeData(e)} name="name" type="text" />
          <label>Username</label>
          <input onChange={(e) => changeData(e)} name="username" type="text" />
          <label>E-Mail</label>
          <input onChange={(e) => changeData(e)} name="email" type="text" />
          <div className="signup-password">
            <label>Password</label>
            <input onChange={(e) => changeData(e)} name="password" type={checkPassword.type} />
            <div
              onClick={(e) => {
                showPassword(e);
              }}
            >
              {checkPassword.content}
            </div>
          </div>
          <label>Image</label>
          <input
            onChange={(e) => imageChange(e)}
            accept="image/*"
            type="file"
            name="avatar"
            className="image-upload"
          />
        </div>
        <div className="signup-buttons">
          <div className="login-button">
            <button onClick={(e)=>handleData(e)}>Signup</button>
          </div>
          <div className="login-button">
            <button>
              <Link href="/">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
