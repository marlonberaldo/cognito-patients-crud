import { type ResourcesConfig } from "aws-amplify";

export const userAuthConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USERS_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USERS_CLIENT_ID)
  }
};
