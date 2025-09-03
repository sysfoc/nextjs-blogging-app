import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { hashedPassword } from "@/app/utils/hashing";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { name, email, password } = await req.json();
  connectToDatabase();
  const encryptedPassword = await hashedPassword(password);
  try {
    await User.findByIdAndUpdate(
      id,
      { name, email, password: encryptedPassword },
      { new: true }
    );
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
