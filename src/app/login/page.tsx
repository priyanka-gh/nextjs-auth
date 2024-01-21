"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    const onLogin = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("Login success")
            toast.success("Login success")
            router.push("/profile")
        } catch(error: any){
            console.log("Login failed ",error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col text-black items-center justify-center min-h-screen py-2 gap-2'>
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr/>
            <input
                className='p-2 rounded-sm'
                id='email'
                type='email'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder='email'
            ></input>
            <label htmlFor='password'>Password</label>
            <input
                className='p-2 rounded-sm'
                id='password'
                type='password'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder='password'
            ></input>
            <button className='bg-white text-black min-w-screen p-2' onClick={onLogin}>Login</button>
            <Link className='text-white' href="/signup">Visit Signup Page</Link>
        </div>
    )
}

export default LoginPage