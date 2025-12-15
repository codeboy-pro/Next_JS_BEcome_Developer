import React from 'react'

import Image from 'next/image'
import Link from 'next/link'


const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white text-gray-600'>
        <Image src={"/notFound.svg"} alt='Not Found-Image' height={400} width={400}></Image>
<Link href={"/"} className='px-5 py-2 bg-gray-700 mt-10 shadow-md text-white rounded-lg hover:text-gray-400 cursor-pointer font-bold'>Back to home</Link>
    </div>
  )
}

export default NotFound

