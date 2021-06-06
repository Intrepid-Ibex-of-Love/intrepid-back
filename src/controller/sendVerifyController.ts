// require("dotenv").config();
import 'dotenv/config'
// import * as dotenv from "dotenv";


import nodemailer = require('nodemailer');

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASSWORD_APLICATION;

export const transporter= nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure:true,
        auth: {
            user: user,
            pass: pass
        }
    });

transporter.verify().then(()=>{
    console.log('Ready for send emails')
})
