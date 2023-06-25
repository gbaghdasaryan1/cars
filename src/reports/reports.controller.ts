import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportService: ReportsService) { }


    @Patch('approve/:id')
    @UseGuards(AdminGuard)
    @Serialize(ReportDto)
    approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
        console.log(id, "control");

        return this.reportService.approve(id, body.approved)
    }


    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user)
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto){
        return this.reportService.createEstimate(query)
        
    }

}
