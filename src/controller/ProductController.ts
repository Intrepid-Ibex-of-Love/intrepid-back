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
        return await this.productRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {

        let userId = request.body.userId;
        if(request.body.product_name===''){
            return response.status(418).send('Soy una tetera');
        }else{
            //let productSave = await this.productRepository.save(request.body);
            let productSave = await createQueryBuilder()
                            .insert()
                            .into(Product)
                            .values(
                                {
                                product_name: request.body.product_name,
                                description: request.body.description,
                                day_start: request.body.day_start,
                                day_finish: request.body.day_finish,
                                photo: request.body.photo,
                                userId: userId
                                }
                            ).execute(); 

            return productSave;
            
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let productToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(productToRemove);
    }

    async getProductByUser(request: Request, response: Response, next: NextFunction){

        let userId = request.params.id;

        let products = await createQueryBuilder()
                        .select("*")
                        .from(Product, "product")
                        .where(`product.userId='${userId}'`)
                        .getRawMany();
                        
        return products;

    }

    async edit(request: Request, response: Response, next: NextFunction){
        
        let product = await this.productRepository.findOne(request.params.id);

        this.productRepository.merge(product, request.body);
        
        let productEdit = await this.productRepository.save(product);
        
        return productEdit;
        

    }

}