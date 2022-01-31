import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

    async create(price: number) {
        const report = this.repo.create({ price })
        let createdReport = await this.repo.save(report)
        return createdReport
    }

    async findOne(id: number) {
        const report = await this.repo.findOne(id)
        if (!report) {
            throw new Error(`report with ${id} not found`)
        }
        return report
    }
    async find() {
        const report = await this.repo.find()
        if (!report) {
            throw new Error(`No reports created till date`)
        }
        return report
    }
    async remove(id: number) {
        const report = await this.repo.findOne(id)
        if (!report) {
            throw new Error(`report with ${id} not found`)
        }
        return this.repo.remove(report)
    }
}
