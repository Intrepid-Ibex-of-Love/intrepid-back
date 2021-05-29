import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class AuthController {
    login(req, res) {
        return res.send('ok')
    }

    register(req, res) {
        return res.send('ok')
    }
}