// import { getRepository } from "typeorm";
// import { NextFunction, Request, Response } from "express";
import { UserController } from "./UserController";
// import { User } from "../entity/User";
import * as jwt from "jsonwebtoken"

import * as bcrypt from 'bcrypt';
// import { SendVerifyController } from "./sendVerifyController"
import * as nodemailer from 'nodemailer';
import { sendConfirmationEmail, transporter } from './sendVerifyController'

export class AuthController {
    userController = new UserController()
    // sendVerifyController = new SendVerifyController()
    login(req, res) {
        const { email, password } = req.body;
        return this.userController.oneEmail({ email }, res)
            .then(userFound => {
                if (!userFound) {
                    return res.status(404).send('email o usuario incorrectos');
                }

                if (userFound.status == "no_verify") {
                    return res.status(401).send({
                        message: "Cuenta pendiente. Verifique su correo electrónico!",
                    });
                }

                let validatePassword = bcrypt.compareSync(password, userFound.password);
                if (validatePassword) {
                    let token = jwt.sign({ email: userFound.email }, process.env.BCRYPT_FRASE);
                    let user = { user: userFound, token: token }
                    res.status(200).send(user);
                } else {
                    res.status(400).send('¡usuario o contraseña incorrectos!');
                }
            })

    }

    verifyUser(req, res) {
        let { confirmation_code } = req.body;
        this.userController.oneConfirmationCode({ confirmation_code }, res)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                user.status = "verify";
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                });
            })
            .catch((e) => console.log("error", e));
    }

    register(req, res) {
        let { name, last_name, email, post_code, password, role } = req.body;
        this.userController.oneEmail({ email }, res)
            .then(userFound => {
                if (userFound) {
                    return res.send('Ya hay una cuenta registrada con este email!')
                } else {
                    const passwordHash = bcrypt.hashSync(password, 4);
                    this.userController.save({ name, last_name, email, post_code, password: passwordHash, role }, res)

                        .then(async newUser => {
                            // await transporter.sendMail({
                            //     from: `<${process.env.GMAIL_USER}>`,
                            //         to: `<${newUser.email}>`,
                            //         subject: "Por favor confirma tu email",
                            //         html: `<h1>Confirmación de Email</h1>
                            //                 <h2>Hola ${name}</h2>
                            //                 <p>Gracias por usar nuestra aplicación por favor confirma tu cuenta ingresando en el siguiente enlace</p>
                            //                 <a href=http://localhost:8081/confirm/${newUser.password}> Haz click aquí </a>
                            //                 </div>`,

                            // });

                            await sendConfirmationEmail(
                                newUser.name,
                                newUser.email,
                                newUser.password
                            );

                            return res.send('okey');
                        })
                }
            })
        // .then(send => console.log(send))
    }
}