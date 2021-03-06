import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    //create user
    create(email: string, password: string) {
        const user = this.repo.create({ email, password })
        return this.repo.save(user)

    }
    //find user
    async findOne(id: number) {
        if (id === null) {
            return null
        }
        const user = await this.repo.findOne(id)
        if (!user) {
            throw new NotFoundException('user not found findone')
        }
        return user

    }
    async find(email: string) {
        return await this.repo.find({ email })

    }
    async update(id: number, data: Partial<User>) {
        const user = await this.repo.findOne(id)
        if (!user) {
            throw new Error('user not found update')
        }
        await this.repo.save({ ...user, ...data })
    }
    async remove(id: number) {
        const user = await this.repo.findOne(id)
        if (!user) {
            throw new Error('user not found remove')
        }
        return this.repo.remove(user)

    }
}
