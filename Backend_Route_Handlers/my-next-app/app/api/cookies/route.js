import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request){
    //Read cookie from request
// const theme=request.cookies.get("theme");
// console.log(theme);
const cookieStore=await cookies();
// const resultsperPage=cookieStore.get("resultsperPage");
// console.log(resultsperPage);
//2nd approach
// return new Response("setting cookies",{
//     headers:{
//         "Set-Cookie":"resultsperPage=20"
//     }
// })
// cookieStore.set("score","100");//3rd approach(best)
cookieStore.delete("score");

return NextResponse.json({message:"cookie deleted!"});

}