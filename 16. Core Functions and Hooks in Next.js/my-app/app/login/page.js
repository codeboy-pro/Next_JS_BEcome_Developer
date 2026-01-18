"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Login = () => {
const router=useRouter();
const handleclick=()=>{
    router.push("/products");
}
 const handleback=()=>{
    router.back();
}
  return (
    <div>
        <button className='cursor-pointer' onClick={handleclick}>
            Go to the Products
        </button>
        <br/>
        <button className='cursor-pointer' onClick={handleback}>
            back
        </button>
    </div>
  )
}

export default Login;