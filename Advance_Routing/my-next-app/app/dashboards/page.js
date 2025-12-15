import Link from 'next/link'
import React from 'react'

const Dashboard_page = () => {
  return (
    <div>
        <h1>
            Dashboard_page
        </h1>
        <Link href={"/profile"}>Go to profile</Link>
    </div>
  )
}

export default Dashboard_page