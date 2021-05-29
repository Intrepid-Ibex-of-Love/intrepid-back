import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
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
    name: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true
    })
    photo: string;

    @Column({
        type: Date,
    })
    day_start: Date;


    @Column({
        type: Date,
    })
    day_finish: Date;
    
    @ManyToOne(()=>User, user => user.id)
    user: User;

    @ManyToMany(()=>Category)
    @JoinTable()
    categories : Category[]

    
}
