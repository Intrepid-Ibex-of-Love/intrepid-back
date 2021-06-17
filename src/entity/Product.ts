import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne} from "typeorm";
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
        type: "longblob",
    })
    photo: Buffer;
    
    @Column({
        type: "varchar",
        length: 60
    })
    category: string;

    @Column({
        type: "int",
    })
    userId: number;

    @ManyToOne(()=>User, user => user.id, {cascade: true})
    user: User;
}
