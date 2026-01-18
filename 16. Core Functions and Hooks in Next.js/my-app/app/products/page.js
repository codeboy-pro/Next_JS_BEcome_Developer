"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Products_route = () => {
    const router=useRouter();
     const handleback=()=>{
    router.back();
}
//refresh ,forward
  return (
    <div>
        <h1>Products</h1>
        <button className='cursor-pointer' onClick={handleback}>
            back
        </button>
    </div>
  )
}

export default Products_route