import React from 'react'

const page = async({params}) => {
    const {id,reviewId}=await params;
  return (
    <div>id is {id} and review id is {reviewId}</div>
  )
}

export default page

