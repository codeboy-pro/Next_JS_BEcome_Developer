import dbconnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
    try{
      await dbconnect();
      const notes=await  Note.find({}).sort({createdAt:-1});
      const serializedNotes = notes.map(note => ({
          _id: note._id.toString(),
          title: note.title,
          content: note.content,
          createdAt: note.createdAt.toISOString(),
          updatedAt: note.updatedAt.toISOString()
      }));
      return NextResponse.json({success:true,data:serializedNotes});

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
        
        const serializedNote = {
            _id: note._id.toString(),
            title: note.title,
            content: note.content,
            createdAt: note.createdAt.toISOString(),
            updatedAt: note.updatedAt.toISOString()
        };
        
return NextResponse.json({success:true,data:serializedNote},{status:201})
    }catch(error){
return NextResponse.json({success:false,error: error.message},{status:500})

        // error: error.message
    }
    
}
