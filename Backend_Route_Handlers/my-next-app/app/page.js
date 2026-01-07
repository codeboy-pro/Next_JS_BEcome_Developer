import React from 'react'

const page = async() => {
  const res=await fetch('http://localhost:3000/api/hello');
const data=await res.json();
  return (
    <div>
      <p>
        {JSON.stringify(data)}
      </p>
      
    </div>
  )
}

export default page
