import { emailTransporter } from "../config/email";

const from = "vscrape@8uint.com";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async ({ to, subject, text, html }: Params) => {
  try {
    const status = await emailTransporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    return { emailStatus: status.messageId, emailError: undefined };
  } catch (e) {
    return {
      emailStatus: "Email Error",
      emailError: "Unable to send email. Please try again later.",
    };
  }
};
