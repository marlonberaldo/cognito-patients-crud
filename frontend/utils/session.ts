"use server";

import { cookies } from "next/headers";

import { userAuthConfig } from "@/lib/auth-config";

import { fetchAuthSession } from "aws-amplify/auth/server";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const { runWithAmplifyServerContext } = createServerRunner({
	config: {
		Auth: userAuthConfig
	}
});

export async function getAccessToken() {
	try {
		return await runWithAmplifyServerContext({
			nextServerContext: { cookies },
			operation: async (contextSpec) => {
				let session = await fetchAuthSession(contextSpec);

				if (!session) {
					session = await fetchAuthSession(contextSpec, { forceRefresh: true });
				}

				if (!session.tokens?.accessToken) {
					throw new Error("No access token");
				}

				return session.tokens.accessToken.toString();
			}
		});
	} catch (error) {
		console.error(error);

		return "";
	}
}
