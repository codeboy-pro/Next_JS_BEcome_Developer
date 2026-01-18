"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const ProductIdSlugPage = () => {
    const params=useParams();
    console.log(params);

  return (
    <div>
        <h1>Product Id:{params.id}</h1>
        <h1>Product Id:{params.slug}</h1>

    </div>
  )
}

export default ProductIdSlugPage