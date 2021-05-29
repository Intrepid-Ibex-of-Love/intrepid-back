import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

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

    async oneEmail(request: Request, response: Response) {
        return this.userRepository.findOne({email: request.email});
    }

    // async save(request: Request, response: Response, next: NextFunction) {
    async save(request: Request, response: Response) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}