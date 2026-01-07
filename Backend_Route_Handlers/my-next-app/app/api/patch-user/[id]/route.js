import { NextResponse } from "next/server";
import { users } from "../../hello/route";

export async function PATCH(request,{params}) {
    try{
const {id}=await params;
const userId=parseInt(id);
const userIndex=users.findIndex(u=>u.id===userId);
if(userIndex===-1){
    return NextResponse.json({
        success:false,error:"User not found"
    },{status:404})
}

const body=await request.json();
users[userIndex]={
  ...users[userIndex],
  ...body,
  id:userId
}

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