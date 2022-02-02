import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/adminguard';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get()
    getEstimate(@Query() query: GetEstimateDTO) {
        return this.reportsService.getEstimate(query)
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.reportsService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param() id: string, @Body() body: ApproveReportDTO) {
        return this.reportsService.changeApproval(id, body.approved)
    }
    // @Get('/:id')
    // getReportByID(@Param('id') id: string) {
    //     return this.reportsService.findOne(parseInt(id))
    // }
    // @Delete('/:id')
    // removeReport(@Param('id') id: string) {
    //     return this.reportsService.remove(parseInt(id))
    // }
}
