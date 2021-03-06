import { Report } from "../reports/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (reports) => reports.user)
    reports: Report[];

    @Column({ default: true })
    admin: boolean
}