import Link from 'next/link'
import React from 'react'

const SectionPage = () => {
  return (
    <div>
        <h1>
            Sectiom
        </h1>
        <Link href={"/admin"}>Go to admin</Link>
    </div>
  )
}

export default SectionPage