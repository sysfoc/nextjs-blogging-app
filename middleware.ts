import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { v4 as uuidv4 } from "uuid";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isValid = await verifyToken(token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  const res = NextResponse.next();
  if (pathname.startsWith("/category")) {
    let visitorId = req.cookies.get("visitorId")?.value;

    if (!visitorId) {
      visitorId = uuidv4();
      res.cookies.set("visitorId", visitorId, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/category/:path*"],
};
