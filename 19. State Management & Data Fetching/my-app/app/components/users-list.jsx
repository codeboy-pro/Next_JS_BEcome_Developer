"use client"
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AlertCircle } from 'lucide-react'

async function fetchUsers() {
    const response = await fetch('/api/users');
    return response.json();
}

const UserList = () => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                <h2 className="text-2xl font-bold">Users</h2>
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error?.message || 'Failed to fetch users'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-2xl font-bold">Users</h2>
            {data?.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar>
                            <AvatarFallback>
                                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{user.name}</CardTitle>
                            <CardDescription>{user.email || 'No email provided'}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}

export default UserList