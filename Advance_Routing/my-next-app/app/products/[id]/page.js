import React from 'react'

const Products = async ({params}) => {
  const { id } = await params
  return (
    <div>products-{id}</div>
  )
}

export default Products