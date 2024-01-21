"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import {toast} from "react-hot-toast"

const SignupPage = () => {
    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signed up", response.data)
            router.push("/login")
        } catch(error: any) {
            console.log("Signup Failed ",error.message)
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className='flex flex-col text-black items-center justify-center min-h-screen py-2 gap-2'>
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor='username'>Username</label>
            <input
                className='p-2 rounded-sm'
                id='username'
                type='text'
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder='username'
            ></input>
            <label htmlFor='email'>Email</label>
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
            <button className='bg-white text-black min-w-screen p-2' onClick={onSignup}>{buttonDisabled ? "Cant signup" : "Signup"}</button>
            <Link className='text-white' href="/login">Visit Login Page</Link>
        </div>
    )
}

export default SignupPage