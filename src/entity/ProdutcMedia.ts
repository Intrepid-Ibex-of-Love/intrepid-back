import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductMedia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 2083
    })
    uri: string;

    @ManyToOne(() => Product, product => product.productMedias)
    product: Product;
}
