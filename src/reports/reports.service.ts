import { CreateReportDto } from './dto/create-report.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly reportRepo: Repository<Report>){}

    create(createReportDto: CreateReportDto, user: User){
        const report =  this.reportRepo.create(createReportDto) 
        report.user = user
        return this.reportRepo.save(report)
    }


    async approve(id: number, approve: boolean){
        const report = await this.reportRepo.findOne({where: {id}});
        if(!report){
            throw new NotFoundException('report not found')
        }

        
        report.approved = approve
        return this.reportRepo.save(report)
    }

    async createEstimate ({make, model, lng,lat,year,mileage}: GetEstimateDto) {
        const estimate = await this.reportRepo.createQueryBuilder()
        .select("AVG(price)","price")
        .where('make = :make',{make})
        .andWhere('model = :model',{model})
        .andWhere('lng - :lng BETWEEN -5 AND 5',{lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5',{lat})
        .andWhere('year - :year BETWEEN -3 AND 3',{year})
        .andWhere('approved IS TRUE')
        .setParameters({mileage})
        .getRawOne()

        console.log(estimate);
        

        return estimate
    }
}
