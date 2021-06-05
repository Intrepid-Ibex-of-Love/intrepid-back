// require("dotenv").config();
// import * as dotenv from "dotenv";
// import * as  nodemailer from 'nodemailer';

import nodemailer = require('nodemailer');

// export const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'rodrigo.ward15@ethereal.email',
//         pass: 'EqgDVyVvQux7wA46xs'
//     }
// });

export const transporter= nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure:true,
        auth: {
            user: 'tenegrocomomialma@gmail.com',
            pass: 'czkmemrchsaolcne'
        }
    });

transporter.verify().then(()=>{
    console.log('Ready for send emails')
})

// const user = process.env.GMAIL_USER;
// const pass = process.env.GMAIL_PASSWORD;

// export class SendVerifyController {

    // transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     auth: {
    //         user: 'rodrigo.ward15@ethereal.email',
    //         pass: 'EqgDVyVvQux7wA46xs'
    //     }
    // });

    // transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'rodrigo.ward15@ethereal.email',
    //         pass: 'EqgDVyVvQux7wA46xs'
    //     }
    // });


//     transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: user,
//         pass: pass,
//     },
// });

//     sendConfirmationEmail = (name, email, confirmationCode) => {
//         this.transporter.sendMail({
//             from: "rodrigo.ward15@ethereal.email",
//             to: "tenegrocomomialma@gmail.com",
//             subject: "Por favor confirma tu email",
//             html: `<h1>Confirmación de Email</h1>
//             <h2>Hola ${name}</h2>
//             <p>Gracias por usar nuestra aplicación por favor confirma tu cuenta ingresando en el siguiente enlace</p>
//             <a href=http://localhost:8081/confirm/${confirmationCode}> Haz click aquí </a>
//             </div>`
//         })
//         .catch(err => console.log(err));
//     };
// }

// const transport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: user,
//         pass: pass,
//     },
// });

// module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
//     transport.sendMail({
//         from: user,
//         to: email,
//         subject: "Por favor confirma tu email",
//         html: `<h1>Confirmación de Email</h1>
//         <h2>Hola ${name}</h2>
//         <p>Gracias por usar nuestra aplicación por favor confirma tu cuenta ingresando en el siguiente enlace</p>
//         <a href=http://localhost:8081/confirm/${confirmationCode}> Haz click aquí </a>
//         </div>`,
//     }).catch(err => console.log(err));
// };