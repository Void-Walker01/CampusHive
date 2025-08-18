import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const sendVerificationEmail = async (userEmail, verificationToken) => {
    // 1. Configure Nodemailer to use SendGrid
    const transporter = nodemailer.createTransport(sgTransport({
        auth: {
            api_key: process.env.SENDGRID_API,
        }
    }));

    const frontendUrl=process.env.CORS_ORIGIN || 'http://localhost:5173';
    const verificationUrl = `${frontendUrl}/verify-email/${verificationToken}`;

    const mailOptions = {
        from: 'whyimade5@gmail.com',
        to: userEmail,
        subject: 'Verify Your Email for CampusHive',

        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                <h2>Welcome to CampusHive!</h2>
                <p>Thanks for signing up. Please verify your email address by clicking the button below.</p>
                <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;">
                    Verify Email
                </a>
                <p style="margin-top: 20px;">If you did not sign up for this account, you can ignore this email.</p>
            </div>
        `
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(err){
        console.error('Error sending email:', err);
    }
};

export default sendVerificationEmail;