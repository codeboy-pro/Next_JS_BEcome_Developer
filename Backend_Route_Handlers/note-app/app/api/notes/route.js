import dbconnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
    try{
      await dbconnect();
      const notes=await  Note.find({}).sort({createdAt:-1});
      return NextResponse.json({success:true,data:notes});

    }catch(error){
return NextResponse.json({success:false,
    error: error.message},
    {status:404})

    }
}

export async function POST(request) {
    try{
        await dbconnect();
        const body=await request.json();
        const note=await Note.create(body);
        
return NextResponse.json({success:true,data:note},{status:201})
    }catch(error){
return NextResponse.json({success:false,error: error.message},{status:500})

        // error: error.message
    }
    
}
