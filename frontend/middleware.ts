import { type NextRequest, NextResponse } from "next/server";

import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const user = await authenticatedUser({ request, response });

	const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

	if (isOnDashboard) {
		if (!user)
			return NextResponse.redirect(new URL("/?error=unauthorized", request.nextUrl));
		return response;
	} else if (user) {
		return NextResponse.redirect(new URL("/dashboard/patients", request.nextUrl));
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)",
	],
};