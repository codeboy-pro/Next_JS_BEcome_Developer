import { prisma } from "./db";
async function main() {
    await prisma.post.createMany({
        data:[
            { title: "First Post", content: "This is the content of the first post." },
            { title: "Second Post", content: "This is the content of the second post." },
            { title: "Third Post", content: "This is the content of the third post." },

        ]
    })
    console.log(`[seed] Data seeded successfully`);
    
    
}