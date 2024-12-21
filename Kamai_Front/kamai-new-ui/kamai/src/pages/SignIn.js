import React from 'react'
import { SignInPage } from '@toolpad/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSession } from '../SessionContext';

const providers = [{ id: 'credentials', name: 'Email and Password' }];
export default function SignIn() {

  const navigate = useNavigate();
  const { session, setSession } = useSession();
  // console.log(handleSignIn);
  const handleLogin = async (provider, formData, callbackUrl) => {
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    setSession({
      user: {
        email: response.data.user.email,
        name: response.data.user.name,
        role: response.data.user.role
      }
    })
    if (response.data.user.role === "admin") {
      navigate("/deals")
    }
    else {
      navigate("/activeDeals");
    }
  };

  return (
    <SignInPage signIn={handleLogin} providers={providers}  >
    </SignInPage>
  )
}
