import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: any
) {
  const { id } = context.params;
  connectToDatabase();
  try {
    await User.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
