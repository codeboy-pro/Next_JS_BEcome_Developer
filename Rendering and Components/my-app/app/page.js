
// import React, { useState } from 'react'

const page = async() => {
  // const [first, setfirst] = useState(0)
const res=await fetch("https://api.github.com/users/codeboy-pro");
const data=await res.json();

  return (
    <div>
      <div>
        {JSON.stringify(data)}
      </div>
      {/* <button onClick={()=>{
        alert("hello world")
      }}>
      </button> */}
    </div>
  )
}

export default page
