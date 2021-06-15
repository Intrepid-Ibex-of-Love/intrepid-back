import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 200
    })
    product_name: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    description: string;

    @Column({
        type: Date,
    })
    day_start: Date;

    @Column({
        type: Date,
    })
    day_finish: Date;
    
    @Column({
        type: "blob",
    })
    photo: string;

    @Column({
        type: "int",
    })
    userId: number;

    @ManyToOne(()=>User, user => user.id, {cascade: true})
    user: User;

    @ManyToMany(()=>Category)
    @JoinTable()
    categories : Category[];

    
}
