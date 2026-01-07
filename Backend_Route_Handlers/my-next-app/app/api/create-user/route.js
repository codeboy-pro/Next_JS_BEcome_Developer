import { NextResponse } from "next/server";
import { users } from "../hello/route";
export async function POST(request) {
  try {
    const { name, email, age } = await request.json();
    if (!name || !email || !age) {
      return NextResponse.json(
        {
          sussess: false,
          error: "Name and email abd age are required",
        },
        { status: 400 }
      );
    }
    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      return NextResponse.json(
        {
          sussess: false,
          error: "Email already exists",
        },
        { status: 400 }
      );
    }
    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      age: age,
    };
    users.push(newUser);
    return NextResponse.json(
      { success: true, data: users, message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "failed to create user",
      },
      { status: 500 }
    );
  }
}
