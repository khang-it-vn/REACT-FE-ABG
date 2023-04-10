import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import "../css/login.css";
import webPimage from "../images/ABG_logo.png"
import axios from 'axios';


const handleLogin = async (credential) => {
    const res = await axios.post('http://localhost:3000/login', {credential});
    console.log(res.data[1]);
    localStorage.setItem('token', res.data[1].token.toString());
    localStorage.setItem('role', res.data[2].from);

    window.location.href = "http://localhost:5173/"
}
const DangNhap = () => {
  return (
    <div className='main-container'>
      <GoogleOAuthProvider clientId="365062625571-oipgvhgr69fn34i2hahqdk1483hdqllg.apps.googleusercontent.com">

        <GoogleLogin
          onSuccess={credentialResponse => {
            const details = jwt_decode(credentialResponse.credential);
            // console.log(details)
            console.log(credentialResponse);

            
            handleLogin(credentialResponse.credential);
          }}
          onFailure={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  )
}

export default DangNhap

