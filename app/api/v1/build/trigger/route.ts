// app/api/v1/build/trigger/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { config } from "@/app/utils/env-config";
import { exec } from "child_process";
import { promisify } from "util";

 const execAsync = promisify(exec);

// export async function POST(req: Request) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, config.jwtSecretKey as string) as {
//       id: string;
//     };

//     if (!decoded.id) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 403 });
//     }

//     // Build script run karo
//     const { stdout, stderr } = await execAsync('/home/netw/build-script.sh');
    
//     console.log('Build output:', stdout);
//     if (stderr) console.error('Build errors:', stderr);

//     return NextResponse.json(
//       { message: "Build completed successfully", output: stdout },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Build error:", error);
//     return NextResponse.json(
//       { message: "Build failed: " + error.message },
//       { status: 500 }
//     );
//   }
// }



// app/api/v1/build/trigger/route.ts
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecretKey as string) as {
      id: string;
    };

    if (!decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    // Background mein run karo
    exec('/home/netw/build-script.sh', (error) => {
      if (error) console.error('Build error:', error);
    });

    return NextResponse.json(
      { message: "Build started successfully. Please wait 2-3 minutes." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}