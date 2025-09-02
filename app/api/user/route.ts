import { connectToDatabase } from "@/app/utils/connection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
   await connectToDatabase();

   return NextResponse.json({ message: "Hello, Next.js!" });
}