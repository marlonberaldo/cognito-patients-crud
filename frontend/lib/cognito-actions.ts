/* eslint-disable import/order */
import { redirect } from "next/navigation";

import { TConfirmSignUp, TSignIn, TSignUp } from "./schemas/auth-schema";

import {
  autoSignIn,
  confirmResetPassword,
  confirmSignIn,
  confirmSignUp,
  confirmUserAttribute,
  resendSignUpCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
  updateUserAttribute,
  type UpdateUserAttributeOutput
} from "aws-amplify/auth";

import { getErrorMessage } from "@/utils/get-error-message";

/**
 * Handles the sign up process.
 *
 * @param {TSignUp} values - The sign up form values (email, name, password).
 * @see {@link TSignUp} for parameter details.
 * @returns {string | void} The error message (if any occurred), or redirects to the confirm sign up page.
 */
export async function handleSignUp(values: TSignUp) {
  //
  try {
    await signUp({
      username: String(values.email),
      password: String(values.password),
      options: {
        userAttributes: {
          email: String(values.email),
          name: String(values.name),
        },
        autoSignIn: true
      }
    });
  } catch (error) {
    console.error("Error signing up", error);

    return getErrorMessage(error);
  }

  return `/auth/confirm-signup?email=${encodeURIComponent(values.email)}`;
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email"))
    });
    currentState = {
      ...prevState,
      message: "Code sent successfully"
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error)
    };
  }

  return currentState;
}

/**
 * Handles the confirm sign up process.
 *
 * @param {TConfirmSignUp} values - The confirm sign up form values (email, code).
 * @see {@link TConfirmSignUp} for parameter details.
 * @returns {string | void} The error message (if any occurred), or redirects to the login page.
 */
export async function handleConfirmSignUp(values: TConfirmSignUp) {
  try {
    await confirmSignUp({
      username: values.email,
      confirmationCode: values.code
    });

    await autoSignIn();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return "/dashboard/patients?firstLogin=true";
}

/**
 * Handles the sign in process.
 *
 * @param {TSignIn} values - The sign in form values (email, password).
 * @see {@link TSignIn} for parameter details.
 * @returns {string | void} The error message (if any occurred), or redirects to the app or admin page.
 */
export async function handleSignIn(values: TSignIn) {
  let redirectLink = "/dashboard/patients";

  try {
    const data = await signIn({
      username: values.email,
      password: values.password
    });

    if (data.nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: values.email
      });
      redirectLink = "/auth/confirm-signup";
    } else if (
      data.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
    ) {
      redirectLink = "/auth/confirm-new-password";
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return redirectLink;
}

/**
 * Handles the confirm sign in process.
 *
 * @param {TSignIn} values - The sign in form values (email, password).
 * @returns {string | void} The error message (if any occurred), or redirects to the app or admin page.
 *
 * This function is necessary in the following scenarios:
 * - CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED
 * - CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE
 * - CONFIRM_SIGN_IN_WITH_TOTP_CODE
 * - CONTINUE_SIGN_IN_WITH_TOTP_SETUP
 * - CONFIRM_SIGN_IN_WITH_SMS_CODE
 * - CONTINUE_SIGN_IN_WITH_MFA_SELECTION
 */
export async function handleConfirmSignIn(values: TSignIn) {
  const redirectLink = "/dashboard/patients?firstLogin=true";

  try {
    await confirmSignIn({
      challengeResponse: values.password
    });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  return redirectLink;
}

/**
 * Handles the sign out process.
 * @returns {void}
 */
export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.error(getErrorMessage(error));

    return getErrorMessage(error);
  }

  redirect("/?signedOut=true");
}