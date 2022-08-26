import { env } from "process";

const nodemailer = require("nodemailer");

export class SendEmailService {
    async sendResetPassword(email: String, code: String) {
        try {
            var transporter = nodemailer.createTransport({
                host: env.SMTP_EMAIL,
                port: env.PORT_EMAIL,
                secure: true,
                auth: {
                    user: env.FROM_EMAIL,
                    pass: env.PASSWORD_EMAIL,
                },
            });

            var messageToSend = {
                from: env.FROM_EMAIL,
                to: email,
                subject: "[LocalizaSoft] Solicitação para redefinição de senha.",
                text: `Olá, parece que você solicitou uma redefinição de senha no nosso sistema, aqui está seu código: ${code}`,
                html: `
                    <header style="background-color: #1c1c1c; color: #f7f7f7; padding: 10px;">
                        <h3>Olá, parece que você solicitou uma redefinição de senha!</h3>
                    </header>
                    <article>
                        <p>Use esse código para prosseguir com a redefinição:</p>
                        <p style="background-color: #D9D9D9; color: #1c1c1c; padding: 20px 10px; width: 150px; font-size: 25px; border-radius: 10px; text-align: center">${code}</p>
                        <p>Este é um email automático, favor não responder.</p>
                    </article>
                    <footer style="background-color: #1c1c1c; color: #D9D9D9; padding: 10px;">
                        <h5>Se você não solicitou essa mudança, favor desconsiderar este email.</h4>
                        <h5>Atenciosamente, equipe LocalizaSoft</h4>
                    </footer>
                `
            };

            var info = await transporter.sendMail(messageToSend)

            return ({
                error: false,
                message: "Message sent.",
                data: info
            })
        } catch (e) {
            return ({
                error: true,
                message: "Message don't send",
                data: e
            })
        }
    }
}