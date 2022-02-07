import { User } from '../users/user.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    mileage: number;

    @Column()
    price: number;

    @Column({ default: false })
    approved: boolean
    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}