"use client"
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

import React, {  useState } from 'react'

const QueryProvider = ({children}) => {
    const [client]=useState(()=>new QueryClient());
    
  return (
<QueryClientProvider  client={client}>
    {children}
</QueryClientProvider>
  )
}

export default QueryProvider;
