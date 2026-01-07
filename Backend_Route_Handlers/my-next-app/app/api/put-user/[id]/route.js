import { NextResponse } from "next/server";
import { users } from "../../hello/route";

export async function PUT(request,{params}) {
    try{
const {id}=await params;
const userId=parseInt(id);
const userIndex=users.findIndex(u=>u.id===userId);
if(userIndex===-1){
    return NextResponse.json({
        success:false,error:"User not found"
    },{status:404})
}

const {name,email,age}=await request.json();

if (!name || !email || !age) {
      return NextResponse.json(
        {
          sussess: false,
          error: "Name and email abd age are required",
        },
        { status: 400 }
      );
    }
    users[userIndex]={
        id:userId,
        name:name,
        email:email,
        age:age
    };
    return NextResponse.json({
        success:true,
        data:users[userIndex],
        message:"User Updated",

    })

    }catch(error){
 return NextResponse.json(
      {
        success: false,
        error: "failed to create user",
      },
      { status: 500 }
    );
    }
}