"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

async function createUser(newUser) {
    const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
}

export default function AddUserForm() {
    const [name, setName] = useState("");
    const mutation = useMutation({ mutationFn: createUser });

    const onSubmit = (event) => {
        event.preventDefault();
        mutation.mutate(
            { name },
            {
                onSuccess: () => setName(""),
            }
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add user</CardTitle>
            </CardHeader>
            <form onSubmit={onSubmit} className="space-y-4 p-6">
                <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="User name"
                    disabled={mutation.isPending}
                />
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : "Save"}
                </Button>
                {mutation.isError && (
                    <p className="text-sm text-red-500">{mutation.error.message}</p>
                )}
                {mutation.isSuccess && (
                    <p className="text-sm text-green-600">User saved!</p>
                )}
            </form>
        </Card>
    );
}
