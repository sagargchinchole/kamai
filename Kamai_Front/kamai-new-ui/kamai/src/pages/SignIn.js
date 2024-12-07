import React from 'react'
import { SignInPage } from '@toolpad/core';
const providers = [{ id: 'credentials', name: 'Email and Password' }];
export default function SignIn() {
  
  const handleLogin = async (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(`email is ${email} password is ${password}`);
    //await signIn({ email, password });
  };

  return (
    <SignInPage signIn= {handleLogin} providers={providers}  >
    </SignInPage>
  )
}
