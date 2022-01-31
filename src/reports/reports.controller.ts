import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get()
    getAllReports() {
        return this.reportsService.find()
    }
    @Get('/:id')
    getReportByID(@Param('id') id: string) {
        return this.reportsService.findOne(parseInt(id))
    }
    @Post()
    createReport(@Body() body: CreateReportDTO) {
        return this.reportsService.create(body.price)
    }

    @Delete('/:id')
    removeReport(@Param('id') id: string) {
        return this.reportsService.remove(parseInt(id))
    }
}
