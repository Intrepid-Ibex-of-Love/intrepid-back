import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 200,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    last_name: string;

    @Column({
        type: 'varchar',
        length: 200,
        unique: true
    })
    email: string;

    @Column({
        type: 'int'
    })
    post_code: number;


    @Column({
        type: 'varchar',
        length: 535,
    })
    password: string;

    @Column({
        type: 'decimal'
    })
    ranking: string;

    @Column({
        type: 'varchar',
        length: 2083,
        nullable: true
    })
    photo_user: string;

    @Column({
        type: "enum",
        enum: ["admin", "user"],
        default: "user"
    })
    role: string;

    @Column({
        type: "enum",
        enum: ["verify", "no_verify"],
        default: "no_verify"
    })
    status: string 

    // @Column({
    //     type: 'decimal'
    // })
    // confirmation_code: string;

    @OneToMany(() => Product, product => product.id)
    products: Product[];
}