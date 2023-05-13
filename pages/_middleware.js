import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  // if (req.nextUrl.pathname === "/middleware-protected") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      // secureCookie:
      //   process.env.NEXTAUTH_URL?.startsWith("https://") ??
      //   !!process.env.VERCEL_URL,
    })
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    // if (!session) return NextResponse.redirect("/api/auth/signin")

		// if(status == 'authenticated') 
	const staticFile = /favicon/.test(req.nextUrl.pathname) ||  /static/.test(req.nextUrl.pathname) ||  /auth/.test(req.nextUrl.pathname) || /api/.test(req.nextUrl.pathname)
	if(staticFile)
		return
  if (session && req.nextUrl.pathname !== "/student/verification" && !/api/.test(req.nextUrl.pathname)) {
		if(session.user.isStudent) 
			if(!session.user.studentData.status)
				return NextResponse.redirect('/student/verification')	
    // If user is authenticated, continue.
  }
  // }

}
