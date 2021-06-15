import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Media {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'blob',
    })
    photo: string;

    @Column({
        type: "int",
    })
    productId: number

    @ManyToOne(() => Product, product => product.medias)
    product: Product;
}
