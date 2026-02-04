"use server";

import { prisma } from "@/lib/db";

export const seedDB=async()=>{
    await prisma.post.createMany({
        data:[
            { title: "First Post", description: "This is the content of the first post." },
            { title: "Second Post", description: "This is the content of the second post." },
            { title: "Third Post", description: "This is the content of the third post." }
        ]
    });
    console.log(`[seed] Data seeded successfully`);
    
}