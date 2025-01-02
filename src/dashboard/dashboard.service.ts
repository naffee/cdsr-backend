import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { BackgroundCheckEntity } from 'src/database/entities/background-check.entity';
import { StaffEntity } from 'src/database/entities/staff.entity';

@Injectable()
export class DashboardService {

    constructor (
        @InjectRepository(IncidentEntity)
        private readonly incidentRepository: Repository<IncidentEntity>,
        @InjectRepository(BackgroundCheckEntity)
        private readonly backgroundRepository: Repository<BackgroundCheckEntity>,
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
    ){}

    async getStaff(){
        const totalRegisteredStaff = await this.staffRepository.count()
        const verifiedStaff = await this.staffRepository.count({where: {status: 'verified'}})
        const flaggedStaff = await this.staffRepository.count({where: {status: 'flagged'}})
        const terminatedStaff = await this.staffRepository.count({where: {status: 'terminated'}})

        return({totalRegisteredStaff,verifiedStaff,flaggedStaff,terminatedStaff})
    }

    async getBackgroundChecks(){
        const totalBackgroundChecks = await this.backgroundRepository.count()
        const pendingBackgroundChecks = await this.backgroundRepository.count({where: {status: 'pending'}})

        return({totalBackgroundChecks,pendingBackgroundChecks})
    }

}
