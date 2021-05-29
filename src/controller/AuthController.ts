import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import {UserController } from "./UserController";
import { User } from "../entity/User";

import * as bcrypt from 'bcrypt';

export class AuthController {
    userController = new UserController()
    // nextFunction = new NextFunction();
    login(req, res) {
        const { email, password } = req.body;
        return this.userController.oneEmail({email},res)
        .then(userFound =>{
            // return !userFound || !bcrypt.compareSync(password, userFound.password) 
            // ? res.status(404).send('email o usuario incorrectos') 
            // : "null"
            // ---------------------------------------------------------------------------------

            return typeof(userFound)!=undefined || userFound || bcrypt.compareSync(password, userFound.password) 
            ?  res.send('Logueado Correctamente!')
            : res.status(404).send('email o usuario incorrectos')

            // console.log(userFound);

            // if(userFound != undefined ) return res.status(404).send('email o usuario incorrectos');
            // if(!userFound.password) return res.status(404).send('email o usuario incorrectos');

            // return res.send('Logueado Correctamente')
        })
        
    }

    register(req, res) {

        const { email, password } = req.body;
        //TODO: COMPROBAR QUE EMAIL NO REPETIDO
        const passwordHash = bcrypt.hashSync(password, 4);
        this.userController.save(req,res)
        .then(newUser =>{
            return res.send("usuarios creado con éxito")
        })
        // this.userController.save({name,last_name,email,post_code,password: passwordHash,role},res)
        // .then(newUser =>{
        //     return res.send("usuarios creado con éxito")
        // })
}
}