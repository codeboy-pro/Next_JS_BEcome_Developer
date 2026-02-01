import React from 'react'
export const metadata={
    title:{
    default:"Auth Layout | chai aur code",
    template:"%s | Auth ",
    absolute:"",
    },
    description:"This is the authentication layout for login and signup pages."
}
const Authlayout = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Authlayout