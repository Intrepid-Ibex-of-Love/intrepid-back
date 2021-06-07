import { createQueryBuilder, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    // async one(request: Request, response: Response, next: NextFunction) {
        async one(request: Request, response: Response) {
        // return this.userRepository.findOne(request.params.id);
        return this.userRepository.findOne(request.params.id);
    }

    async oneEmail(request: Request, response: Response): Promise<any> {
        let userFound = await this.userRepository.findOne({email: request.email});
        return userFound;
    }

    async oneConfirmationCode(request: Request, response: Response): Promise<any> {
        let userFound = await this.userRepository.findOne({password: request.confirmationCode});
        return userFound;
    }

    // async save(request: Request, response: Response, next: NextFunction) {
    async save(request: Request, response: Response): Promise<any> {
        return this.userRepository.save(request);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }
}