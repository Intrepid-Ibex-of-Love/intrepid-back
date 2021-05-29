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
                // return typeof (userFound) != undefined || userFound || bcrypt.compareSync(password, userFound.password)
                //     ? res.send('Logueado Correctamente!')
                //     : res.status(404).send('email o usuario incorrectos')

                if(!userFound) return res.status(404).send('1email o usuario incorrectos');
                if(!bcrypt.compare(password, userFound.password)) return res.status(404).send('2email o usuario incorrectos');


                    const token = jwt.sign({email: userFound.email}, "fraseSupeSecreta");

                    return res.json({
                        user: userFound,
                        token: token
                    })
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