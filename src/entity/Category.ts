import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 200
    })
    name: string;

}
