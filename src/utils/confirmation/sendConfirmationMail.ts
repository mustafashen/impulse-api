import { transporter } from "../../services/nodemailTransporter";

async function sendConfirmationMail({to, token}: {to: string, token: string}) {
  const activationAddress = '/client/activation/?token=' + token
  await transporter.sendMail({
    from: process.env.SMTP_SENDER,
    to,
    subject: "Impulse Commerce",
    html: `<a href=${activationAddress}>Confirm Your Email</a>`,
  })

}

export {
  sendConfirmationMail
}