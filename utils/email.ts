import nodemailer from "nodemailer";

type Email = {
    email: string;
    subject: string;
    text: string;
    message: string;
}

export const sendEmail = async (options: Email) => {
    const transporter = nodemailer.createTransport({
        service: "outlook", 
        auth: {
          user: 'fredrick.yalley@outlook.com', 
          pass: 'Tbag@122' 
        },
        tls: {
            rejectUnauthorized: false
        }
      });


      const mailOptions: {} = {
        from: '"ipayroll" <fredrick.yalley@outlook.com>', 
        to: "yalleyfred@gmail.com", 
        subject: "Payslip", 
        text: options.text, 
        html: options.message, 
      }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
      });
}