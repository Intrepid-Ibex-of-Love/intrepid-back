import { createQueryBuilder, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
var urlencode = require('urlencode');

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    // async one(request: Request, response: Response, next: NextFunction) {
    async one(request: Request, response: Response) {
        // return this.userRepository.findOne(83);
        return this.userRepository.findOne(request.params.id);
    }

    async oneEmail(request: Request, response: Response): Promise<any> {
        let userFound = await this.userRepository.findOne({ email: request.email });
        return userFound;
    }

    async findOneThing(request: Request, response: Response): Promise<any> {
        let userFound = await this.userRepository.findOne(request);
        return userFound;
    }


    // async save(request: Request, response: Response, next: NextFunction) {
    async save(request: Request, response: Response): Promise<any> {
        console.log(request);
        return this.userRepository.save(request);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async update(request: Request, response: Response) {
        const user = await this.one(request, response);
        this.userRepository.merge(user, request.body);
        const results = await this.userRepository.save(user);
        return results;
    }

    async verify(request: Request, response: Response) {
        const user = await this.findOneThing({ email: urlencode.decode(request.confirm_code) }, response);
        this.userRepository.merge(user, { status: "verify" });
        const results = await this.userRepository.save(user);
        response.redirect('http://localhost:4200/user-profile')
        return results;
    }

    async resetPass(request: Request, response: Response) {
        const user = await this.findOneThing({ email: request.email }, response);
        this.userRepository.merge(user, { password: request.password });
        const results = await this.userRepository.save(user);
        // response.redirect('http://localhost:4200/user-profile')
        return results;
    }

}