"use client";

import { userAgent } from 'next/server';
import React, { useEffect, useState } from 'react'

const ClientPage = () => {
    const [count, setcount] = useState(0);
const [UserData, setUserData] = useState(null);
console.log("client connsole");

useEffect(()=>{
    async function fetchdata() {
        const res=await fetch("https://api.github.com/users/codeboy-pro");
const data=await res.json();
setUserData(data);
        
    }
    fetchdata();
},[]);

const origin=window.location.origin;

  return (
    <div>
        <h2>Client Component Counter</h2>
         <p>Count:{count}</p>
         <button onClick={()=>{
            setcount(count+1)
         }}>+ Increment</button>
     
         {UserData ? (
            <pre>{JSON.stringify(UserData, null, 2)}</pre>
         ) : (
            <div>Loading...</div>
         )}
         {origin}
    </div>
   
  )
}

export default ClientPage