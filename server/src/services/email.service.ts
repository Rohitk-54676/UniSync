interface SendOtpEmailParams {
  toEmail: string;
  fullName: string;
  otp: string;
  purpose: "register" | "forgot-password";
}

const sendOtpEmail = async ({
  toEmail,
  fullName,
  otp,
  purpose,
}: SendOtpEmailParams): Promise<void> => {
  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_PRIVATE_KEY,
  } = process.env;

  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_PRIVATE_KEY
  ) {
    throw new Error("EmailJS environment variables are missing");
  }

  const response = await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email: toEmail,
          full_name: fullName,
          otp,
          purpose,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(`Failed to send OTP email: ${error}`);
  }
};

export default sendOtpEmail;