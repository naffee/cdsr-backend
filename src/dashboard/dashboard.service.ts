import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverEntity } from 'src/database/entities/driver.entity';
import { SecuirityGuardEntity } from 'src/database/entities/secuirity_guard.entity';
import { DomestinStaffEntity } from 'src/database/entities/domestic_staff.entity';
import { IncidentEntity } from 'src/database/entities/incident.entity';

@Injectable()
export class DashboardService {

    constructor (
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>,
        @InjectRepository(DomestinStaffEntity)
        private readonly domesticStaffRepository: Repository<DomestinStaffEntity>,
        @InjectRepository(SecuirityGuardEntity)
        private readonly secuirityGuardRepository: Repository<SecuirityGuardEntity>,
        @InjectRepository(IncidentEntity)
        private readonly incidentRepository: Repository<IncidentEntity>,
    ){}

    async Dashboard(): Promise<any>{
        const totalRegisteredDrivers = await this.driverRepository.count
        const totalRegisteredSecurity = await this.secuirityGuardRepository.count;
        const totalRegisteredDomestic = await this.domesticStaffRepository.count;
        //const backgroundChecks

        return [totalRegisteredDomestic,totalRegisteredDrivers,totalRegisteredSecurity]
        

    }

    async quickTransactions(){}
}
