import dbconnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function PUT(request,{params}) {
    try {
    const { id } = await params;
    await dbconnect();
    const body=await request.json();
    const note=await Note.findByIdAndUpdate(
        id,
        {...body,updatedAt:new Date()},
        {new:true,runValidators:true}
    );
     if (!note) { 
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }
    
    const serializedNote = {
        _id: note._id.toString(),
        title: note.title,
        content: note.content,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString()
    };
    
return NextResponse.json(
    {success:true,data:serializedNote}
);
  } catch (error) {
   return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
    
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbconnect();
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
