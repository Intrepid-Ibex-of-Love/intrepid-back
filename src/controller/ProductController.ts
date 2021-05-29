import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Product} from "../entity/Product";
import {ProductMedia} from "../entity/ProdutcMedia";

export class ProductController {

    private productRepository = getRepository(Product);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {

        /* const post = await postRepository.findOne(1, { relations: ["categories"] });
        post.categories.push(category);
        await postRepository.save(post); */
        const productSave = await this.productRepository.save(request.body);
        productSave.productMedias = [];
        productSave.productMedias.push({uri:'a',productId:productSave.id});
        return await this.productRepository.save(productSave);
        //return console.log(productSave)

        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(userToRemove);
    }

}