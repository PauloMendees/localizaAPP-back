import { env } from "process";

const nodemailer = require("nodemailer");

export class SendEmailService {
    async sendCode(email: String, code: String) {
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
                subject: "[LocalizaSoft] Criação de conta.",
                text: `Olá, seja bem vindo ao LocalizaSoft`,
                html: `
                    <header style="background-color: #1c1c1c; color: #f7f7f7; padding: 10px;">
                        <h3>Para finalizar o cadastro de sua conta faltam poucos passos!</h3>
                    </header>
                    <article>
                        <p>Use esse código para prosseguir com o registro:</p>
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
                message: "Mensagem enviada.",
                data: info
            })
        } catch (e) {
            return ({
                error: true,
                message: "Mensagem não enviada, contate o suporte.",
                data: e
            })
        }
    }
}