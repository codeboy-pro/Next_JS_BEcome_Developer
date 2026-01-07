import { NextResponse } from "next/server";
import { users } from "../route";

export async function GET(request,{params}) {
  try {
    const {id}=await params;
    const userId=parseInt(id);
    const user=users.find(u=>u.id===userId);
     if(user){
   return NextResponse.json({
      success: true,
      data: user,
      
    });
     }
     return NextResponse.json({
        success:false,
        message:"user is not found"
     },{status:404})
   
  } catch (error) { 
    return NextResponse.json(
      {
        success: false,
        error: "failed to get users",
      },
      { status: 500 }
    );
  }
}
