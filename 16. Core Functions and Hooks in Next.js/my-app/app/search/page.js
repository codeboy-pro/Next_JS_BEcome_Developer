"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

const SearchPage = () => {
    const searchParams=useSearchParams();
   const query=searchParams.get("q");
   const category=searchParams.get("category");
   const page=searchParams.get("page");
    const allParams=Array.from(searchParams.entries());
    console.log(allParams);
    
  return (
    <div>
        <h1>search result for query:{query}</h1>
        <p>{category}</p>
       <p>{page}</p>
    </div>
  )
}

export default SearchPage