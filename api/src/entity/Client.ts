import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Client {

    constructor(name: string, cpf: string, email: string, favorite_color:string, obs:string, id?: number) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.favorite_color = favorite_color;
        this.obs = obs;
        if (typeof id !== "undefined") {
            this.id = id;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    favorite_color: string;

    @Column({
        type: 'text',
        nullable: true
    })
    obs: string
}
