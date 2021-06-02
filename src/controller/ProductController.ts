import {createQueryBuilder, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Product} from "../entity/Product";
import { User } from "../entity/User";

export class ProductController {

    private productRepository = getRepository(Product);
    userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const productSave = await this.productRepository.save(request.body);
        productSave.productMedias = [];
        productSave.productMedias.push({uri:'a' ,productId:productSave.id});
        return await this.productRepository.save(productSave);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let productToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(productToRemove);
    }

    async getProductByUser(request: Request, response: Response, next: NextFunction){

        
        let userId = request.params.id;

        let products = await createQueryBuilder(Product, "product")
                        .select("*")
                        .innerJoin(User, "user", "product.userId = user.id")
                        .where(`product.userId='${userId}'`)
                        .getRawMany();

        return products;

    }

}