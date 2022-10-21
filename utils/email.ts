import nodemailer from "nodemailer";

type Email = {
  email: string;
  subject: string;
  message: string;
};

export const sendEmail = async (options: Email) => {
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "fredrick.yalley@outlook.com",
      pass: "Tbag@122",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions: {} = {
    from: '"ipayroll" <fredrick.yalley@outlook.com>',
    to: options.email,
    subject: "Payslip",
    html: options.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Email not sent!");
    }
    return "Email Sent Succesfully";
  });
};
