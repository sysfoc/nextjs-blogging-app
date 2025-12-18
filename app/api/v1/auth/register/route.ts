// app/api/v1/auth/signup/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/model/User.model";
import { hashedPassword } from "@/app/utils/hashing";

export async function POST(req: Request) {
  await connectToDatabase();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  if (!email.includes("@")) {
    return NextResponse.json(
      { message: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  if (name.length < 3) {
    return NextResponse.json(
      { message: "Name must be at least 3 characters long" },
      { status: 400 }
    );
  }

  try {
    const isExisted = await User.findOne({ email });

    if (isExisted) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Generate incremented user_id
    const allUsers = await User.find({}, { user_id: 1 }).lean();
    
    let maxUserId = 0;
    allUsers.forEach(user => {
      const id = parseInt(user.user_id);
      if (!isNaN(id) && id > maxUserId) {
        maxUserId = id;
      }
    });
    
    const newUserId = (maxUserId + 1).toString();

    const encryptedPassword = await hashedPassword(password);
    
    await User.create({
      user_id: newUserId,
      name,
      email,
      password: encryptedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { message: "Error creating user", error: (err as Error).message },
      { status: 500 }
    );
  }
}