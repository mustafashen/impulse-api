import { transporter } from "../../services/nodemailTransporter";

async function sendActivationMail({name, to, token}: {name: string, to: string, token: string}) {
  try {
    const activationAddress = process.env.DOMAIN + '/client/customer/activate/?token=' + token
    await transporter.sendMail({
      from: process.env.SMTP_SENDER,
      to,
      subject: "Activate Your Account",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Activation Email</title>
        </head>
        <body>
          <div>
            <h1>Welcome to our platform!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for signing up with us. To complete your registration and start using our platform, please click on the link below:</p>
            <a href="${activationAddress}">Activate Now</a>
            <p>Activation link: ${activationAddress}</p>
            <p>Best regards,</p>
            <p>The Team</p>
          </div>
        </body>
      </html>`,
    })
  } catch (error: any) {
    return {Error: error}
  }
}

export {
  sendActivationMail
}