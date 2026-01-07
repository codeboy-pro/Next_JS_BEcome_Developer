import { NextResponse } from "next/server";
export const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    age: 22,
  },
  {
    id: 2,
    name: "Anita Verma",
    email: "anita.verma@example.com",
    age: 24,
  },
  {
    id: 3,
    name: "Amit Das",
    email: "amit.das@example.com",
    age: 21,
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    age: 23,
  },
];

export async function GET(request) {
  try {
const searchParams=request.nextUrl.searchParams;
const name=searchParams.get("name");
const age=searchParams.get("age");
let filterUsers=users;
if(age){
  filterUsers=filterUsers.filter((user)=>user.age===Number(age));
}
if(name){
  filterUsers=filterUsers.filter((user)=>user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

}
    return NextResponse.json({
      success: true,
      data: filterUsers,
      total: filterUsers.length,
    });
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
