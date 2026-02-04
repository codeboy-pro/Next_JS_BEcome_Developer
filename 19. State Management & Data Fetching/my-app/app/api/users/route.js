import { promise } from "zod";

let users=[
    {id:1,name:"John Doe",email:"john.doe@example.com"},
    {id:2,name:"Jane Smith",email:"jane.smith@example.com"},
    {id:3,name:"Alice Alice"}
]
export async function GET() {
    await new Promise((resolve)=>setTimeout(resolve,1000));
    return Response.json(users);   
}

//Mutation  ---> Putting,pathing , deleting
 

export async function POST(request) {
   const body=await request.json();
   const newUser={
    id:Date.now(),
    name:body.name,
    email:body.email,

   } 
   users.push(newUser);
   await new promise((resolve)=>setTimeout(resolve,1000));
    return Response.json(newUser);
}