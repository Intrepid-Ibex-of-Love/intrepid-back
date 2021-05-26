import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Product} from "../entity/Product";

export class ProductController {

    private productRepository = getRepository(Product);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(userToRemove);
    }

}