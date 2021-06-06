import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";

export class CategoryController {

    private categoryRepository = getRepository(Category);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.categoryRepository.findOne(request.params.id);
        await this.categoryRepository.remove(userToRemove);
    }
}