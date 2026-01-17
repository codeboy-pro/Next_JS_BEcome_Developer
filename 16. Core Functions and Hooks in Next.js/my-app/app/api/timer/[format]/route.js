import { NextResponse } from "next/server";

export async function GET(request, { params }) {
const currentTime=new Date();
const {format}=await params;
const data={
    timestamp:currentTime.toISOString(),
        readable:currentTime.toLocaleTimeString(),
        unix:currentTime.getTime(),
        message:"Timer API is working!",
        requestId:Math.random().toString(36).substring(2,15),
        format:format,
        serverTime:Date.now()
        
}

switch(format){
case 'utc':
    data.time=currentTime.toUTCString();
    break;
    case 'iso':
    data.time=currentTime.toISOString();
    break;
    case 'local':
    data.time=currentTime.toLocaleString();
    break;
    default:
        data.time=currentTime.toTimeString();

}

return NextResponse.json(data);
 }