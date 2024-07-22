import { type NextRequest, NextResponse } from "next/server";

import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const user = await authenticatedUser({ request, response });

	if (!user) {
		return NextResponse.redirect(new URL("/?error=unauthorized", request.nextUrl));
	}
}

export const config = {
	matcher: ["/dashboard/:path*"]
};
