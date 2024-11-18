// utils/email.ts
import nodemailer from 'nodemailer';

export async function sendResetEmail(email: string, resetUrl: string) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Or use your email service provider
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS  // Your email password
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
        html: `<p>You requested a password reset. Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
    });
}
