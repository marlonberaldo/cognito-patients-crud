import { FastifyRequest } from "fastify";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoAccessTokenPayload } from "aws-jwt-verify/jwt-model";

export interface IValidateTokenResponse {
  payload: CognitoAccessTokenPayload | null;
  errorMessage?: string;
}

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USERS_USER_POOL_ID as string,
  clientId: process.env.USERS_CLIENT_ID as string,
  tokenUse: "access",
});

export async function ensureAuthenticated(req: FastifyRequest): Promise<IValidateTokenResponse> {
  const { authorization } = req.headers;

  if (!authorization) {
    return { payload: null, errorMessage: "Unauthorized - missing authorization token" };
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload: CognitoAccessTokenPayload = await verifier.verify(token);

    return { payload };
  } catch (error) {
    return { payload: null, errorMessage: "Unauthorized - invalid token" };
  }
}