// import { getRepository } from "typeorm";
// import { NextFunction, Request, Response } from "express";
import { UserController } from "./UserController";
// import { User } from "../entity/User";
import * as jwt from "jsonwebtoken"

import * as bcrypt from 'bcrypt';
// import { SendVerifyController } from "./sendVerifyController"
import * as nodemailer from 'nodemailer';
import { sendConfirmationEmail, transporter, resetPassword } from './sendVerifyController'
var urlencode = require('urlencode');

export class AuthController {
    userController = new UserController()
    // sendVerifyController = new SendVerifyController()
    login(req, res) {
        const { email, password } = req.body;
        return this.userController.oneEmail({ email }, res)
            .then(userFound => {
                if (!userFound) {
                    return res.json({
                        status: false,
                        error: "¡usuario o contraseña incorrectos!"
                    });
                }

                if (userFound.status == "no_verify") {
                    // res.status(403).send({
                    //     message: "Cuenta pendiente. Verifique su correo electrónico!",
                    // });
                    return res.json({
                        status: false,
                        error: "Cuenta pendiente. Verifique su correo electrónico!"
                    });
                }

                let validatePassword = bcrypt.compareSync(password, userFound.password);
                if (validatePassword) {
                    let token = jwt.sign({ email: userFound.email }, process.env.BCRYPT_FRASE);
                    let user = { user: userFound, token: token }
                    res.status(200).send(user);
                } else {
                    return res.json({
                        status: false,
                        error: "¡usuario o contraseña incorrectos!"
                    });
                }
            })
            .catch(error => {
                return res.status(400).json(error)
            })

    }

    verifyUser(req, res) {
        let { confirmation_code } = req.body;
        this.userController.verify({ confirmation_code }, res)
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
            .catch(error => {
                return res.status(400).json(error)
            })
    }

    register(req, res) {
        if (typeof (req.body) === undefined) {
            return res.sendStatus(400)
        } else {
            let { name, last_name, email, post_code, password, role } = req.body;
            this.userController.oneEmail({ email }, res)
                .then(userFound => {
                    if (userFound) {
                        // return res.status(400).send('Ya hay una cuenta registrada con este email!')
                        return res.json({
                            status: false,
                            error: "Ya hay una cuenta registrada con este email!"
                        });
                    } else {
                        const passwordHash = bcrypt.hashSync(password, 4);
                        this.userController.save({ name, last_name, email, post_code, password: passwordHash, role }, res)
                            .then(async newUser => {
                                let confirmationCode = urlencode(newUser.email)
                                await sendConfirmationEmail(
                                    newUser.name,
                                    newUser.email,
                                    confirmationCode
                                );
                                // return res.send('okey');
                                return res.json({
                                    status: true,
                                    error: "Usuario creado con éxito!"
                                });
                            })
                            .catch(error => {
                                return res.json({
                                    status: false,
                                    error: "Comprueba todos los campos"
                                });
                            })
                    }
                })
        }

    }

    resetPassword(req, res) {
        if (typeof (req.body) === undefined) {
            return res.sendStatus(400)
        } else {
            let email= req.body.email
            var randomPassword = Math.random().toString(36).slice(-8);
            let passwordHash = bcrypt.hashSync(randomPassword, 4);
            this.userController.resetPass({email:email,password:passwordHash},res)
            .then(async user =>{
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }else{
                    await resetPassword(
                        user.name,
                        user.email,
                        randomPassword
                    );

                    return res.json({
                        status: true,
                        error: "Se ha reseteado la contraseña con éxito, revisa tu email"
                    });
                }
            })
            .catch(() => {
                return res.json({
                    status: false,
                    error: "No existe una cuenta con ese email"
                });
            })
            
        }
    }
}