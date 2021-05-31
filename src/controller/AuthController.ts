// import { getRepository } from "typeorm";
// import { NextFunction, Request, Response } from "express";
import { UserController } from "./UserController";
// import { User } from "../entity/User";
import * as jwt from "jsonwebtoken"

import * as bcrypt from 'bcrypt';

export class AuthController {
    userController = new UserController()
    login(req, res) {
        const { email, password } = req.body;
        return this.userController.oneEmail({ email }, res)
            .then(userFound => {
                let a = bcrypt.compare(password, userFound.password);
                console.log(a);

                if (!userFound) {
                    return res.status(404).send('email o usuario incorrectos');
                }

                let validatePassword = bcrypt.compareSync(password, userFound.password);
                if (validatePassword) {
                    let token = jwt.sign({ email: userFound.email }, "fraseSupeSecreta");
                    res.status(200).send(userFound);
                } else {
                    res.status(400).send('¡usuario o contraseña incorrectos!');
                }
            })

    }

    register(req, res) {
        let { name, last_name, email, post_code, password, role } = req.body;
        this.userController.oneEmail({ email }, res)
            .then(userFound => {
                console.log(userFound)
                if (userFound) {
                    return res.send('Ya hay una cuenta registrada con este email!')
                } else {
                    const passwordHash = bcrypt.hashSync(password, 4);
                    this.userController.save({ name, last_name, email, post_code, password: passwordHash, role }, res)
                        .then(newUser => {
                            return res.send("usuario creado con éxito")
                        })
                }
            })








    }
}