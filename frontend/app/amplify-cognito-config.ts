"use client";

import { userAuthConfig } from "@/lib/auth-config";

import { Amplify, type ResourcesConfig } from "aws-amplify";

Amplify.configure({ Auth: userAuthConfig }, { ssr: true });

export default function ConfigureAmplifyClientSide() {
	return null;
}
