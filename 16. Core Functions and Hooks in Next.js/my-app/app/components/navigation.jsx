"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
const navigation = () => {
    const pathName=usePathname();
  return (
    <div>navigation</div>
  )
}

export default navigation