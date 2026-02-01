import React from 'react'
export async function generateMetadata({params}) {
    const {slug}=await params;
    const ogImageUrl=`http://localhost:3000/api/og?title=${encodeURIComponent('Blog Post - '+slug)}&description=${encodeURIComponent('This is the blog post about '+slug)}`;
    return {
        title:`Blog Post - ${slug}`,
        description:`This is the blog post about ${slug}`,
        openGraph:{
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Blog Post - ${slug}`,
                },
            ],
        }
    }
}
const blog =async ({params}) => {
    const {slug}=await params;
  return (
    <div>blog {slug}</div>
  )
}
//metadata is only used in server component

export default blog 

