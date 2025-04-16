import nodemailer from 'nodemailer'
import env from '../config/env.js'
import logger from './logger.js'

export default class Mailer {
    private transporter: nodemailer.Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.MAIL_HOST,
            port: env.MAIL_PORT,
            secure: env.MAIL_SECURE,
            auth: {
                user: env.MAIL_USER,
                pass: env.MAIL_PASSWORD,
            }
        })
    }

    async sendMail(to: string, subject: string, text: string) {
        try {
            const info = await this.transporter.sendMail({
                from: env.MAIL_FROM,
                sender: env.MAIL_SENDER,
                to,
                subject,
                text
            })

            logger.info(`Email sent: ${info.messageId}`)
        } catch (error) {
            logger.error(`Error sending email: ${error}`)
        }
    }
}