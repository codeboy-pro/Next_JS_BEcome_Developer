import React from 'react'

const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm text-gray-600">Loading…</p>
        </div>
    </div>
)

export default Loading