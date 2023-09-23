import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function verdict() {
    return Math.random() > 0.5 ? 'Yes, Gay' : 'No, Straight';
}

function mailSender(receiver: string) {
    return transporter.sendMail({
        from: `${process.env.MAIL_USER}`,
        to: receiver,
        subject: 'Auto Mail Testing',
        html: `<h1> Are you Gay? </h1>
        <h3> Verdict is: <b>${verdict()}</b></h3>
        <i> This Mail Was Generated By AbhiBot at ${new Date().toISOString()}</i>`,
    });
}

export default mailSender;