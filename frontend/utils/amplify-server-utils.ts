/* eslint-disable no-console */
"use server";

import { userAuthConfig } from "@/lib/auth-config";

import { createServerRunner, NextServer } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
	config: {
		Auth: userAuthConfig
	}
});

export async function authenticatedUser(context: NextServer.Context) {
	return await runWithAmplifyServerContext({
		nextServerContext: context,
		operation: async (contextSpec) => {
			try {
				const session = await fetchAuthSession(contextSpec);
				if (!session.tokens) {
					return;
				}
				const user = {
					...(await getCurrentUser(contextSpec))
				};

				return user;
			} catch (error) {
				console.log(error);
			}
		}
	});
}
