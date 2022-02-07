import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }


    async getEstimate({ make, model, year, mileage, lat, lng }: GetEstimateDTO) {
        return this.repo.createQueryBuilder()
            .select('price, AVG(price)')
            .where('make=:make', { make })
            .andWhere('model=:model', { model })
            .andWhere('year-:year BETWEEN -3 AND 3', { year })
            .andWhere('lng-:lng BETWEEN -5 AND 5', { lng })
            .andWhere('lat-:lat BETWEEN -5 AND 5', { lat })
            .orderBy('ABS(mileage-:mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
    }

    async create(report: CreateReportDTO, user: User) {
        const newReport = this.repo.create(report)
        newReport.user = user
        return await this.repo.save(newReport)
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne(id)
        if (!report) {
            throw new NotFoundException('report not found')
        }
        report.approved = approved
        return this.repo.save(report)
    }



    // async findOne(id: number) {
    //     const report = await this.repo.findOne(id)
    //     if (!report) {
    //         throw new Error(`report with ${id} not found`)
    //     }
    //     return report
    // }

    // async remove(id: number) {
    //     const report = await this.repo.findOne(id)
    //     if (!report) {
    //         throw new Error(`report with ${id} not found`)
    //     }
    //     return this.repo.remove(report)
    // }
}

