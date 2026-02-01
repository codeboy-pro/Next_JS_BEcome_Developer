import React from 'react'

export const metadata={
    title:"About Page",
    description:"This is the about page of our Next.js application.",
    openGraph:{
        title:"About Page",
        description:"This is the about page of our Next.js application.",
        images:[{
          url:"/globe.svg",
          width:800,
          height:600,
          alt:"About Page Image"
        },{
          url:"/code.svg",
          width:900,
          height:700,
          alt:"About Page Image 2"
        }],
        url:"http://localhost:3000/about"
    }
}
const AboutPage = () => {
  return (
    <div>AboutPage</div>
  )
}
export default AboutPage
