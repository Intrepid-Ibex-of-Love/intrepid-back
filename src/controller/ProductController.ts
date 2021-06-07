import { createQueryBuilder, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";
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

        let userId = request.body.userId;
        if(request.body.product_name===''){
            return response.status(418).send('Soy una tetera');
        }else{
            let createProduct = await createQueryBuilder()
                            .insert()
                            .into(Product)
                            .values(
                                {
                                product_name: request.body.product_name,
                                description: request.body.description,
                                day_start: request.body.day_start,
                                day_finish: request.body.day_finish,
                                userId: userId
                                }
                            )
                            .execute();
    
            /* productSave.productMedias = [];
            productSave.productMedias.push({uri:'a' ,productId:productSave.id}); */
            return createProduct;
            
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let productToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(productToRemove);
    }

    async getProductByUser(request: Request, response: Response, next: NextFunction){

        
        let userId = request.params.id;

        let products = await createQueryBuilder(Product, "product")
                        .select("*")
                        .leftJoin(User, "user", "product.userId = user.id")
                        .where(`product.userId='${userId}'`)
                        .getRawMany();

        return products;

    }

}