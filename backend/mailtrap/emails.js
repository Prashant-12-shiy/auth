import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { response } from "express";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Failed to send verification email ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      template_uuid: "9209832e-0319-48c7-907a-f835293c431c",
      template_variables: {
        name: name,
        company_info_name: "Auth Company",
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    throw new Error("Error", error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email", error);

    throw new Error(`Failed to send password reset email ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipent = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipent,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending reset success email", error);
    throw new Error(`Failed to send reset success email ${error}`);
  }
};
