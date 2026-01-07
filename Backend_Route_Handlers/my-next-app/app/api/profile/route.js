import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const headerList=await headers();
    const authHeader=headerList.get("Authorization");
    //Access request headers
//     const requestHeaders=new Headers(request.headers);
// const authHeader=requestHeaders.get("Authorization");
// console.log(authHeader);

console.log(authHeader);


//    return NextResponse.json({success:true,data:"Hello world from profile"});
// return new Response("<h1>Profile Api Data</h1>",{
//     headers:{
//      "Content-Type":"text/html",
//      "x-custom-Header":"Next.js Tutorial",
//     }}
// )

const response=NextResponse.json({message:"Hello with Headers"});
response.headers.set("x-Powered-By","Nextjs 15");
response.headers.set("cache-control","no store");
return response;
}