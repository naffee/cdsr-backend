import { Injectable,Logger,UnauthorizedException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto,CreateDomesticStaffDto,CreateSecuirityGuardDto } from './staff-list.dto';
import { DriverEntity } from 'src/database/entities/driver.entity';
import { SecuirityGuardEntity } from 'src/database/entities/secuirity_guard.entity';
import { DomestinStaffEntity } from 'src/database/entities/domestic_staff.entity';


@Injectable()
export class StaffListService {
    private readonly logger = new Logger(StaffListService.name);

    constructor(
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>,
        @InjectRepository(DomestinStaffEntity)
        private readonly domesticStaffRepository: Repository<DomestinStaffEntity>,
        @InjectRepository(SecuirityGuardEntity)
        private readonly secuirityGuardRepository: Repository<SecuirityGuardEntity>,

    ) {}

    async createDriver(createDriverDto: CreateDriverDto):Promise<DriverEntity>{
        const newDriver = this.driverRepository.create(createDriverDto)
        return this.driverRepository.save(newDriver);

    };

    async createSecuirityGuard(createSecuirityGuardDto:CreateSecuirityGuardDto):Promise<SecuirityGuardEntity>{
        const newSecuirityGuard = this.secuirityGuardRepository.create(createSecuirityGuardDto)
        return this.secuirityGuardRepository.save(newSecuirityGuard);

    };

    async createDomescticStaff(createDomescticStaffDto: CreateDomesticStaffDto): Promise<DomestinStaffEntity>{
        const newDomesticStaff = this.domesticStaffRepository.create(createDomescticStaffDto)
        return this.domesticStaffRepository.save(newDomesticStaff);
    };

    async getAllDrivers():Promise<DriverEntity[]>{
        return this.driverRepository.find();
    }

    async getAllSecurityGuards():Promise<SecuirityGuardEntity[]>{
        return this.secuirityGuardRepository.find();
    }

    async getAllDomesticStaffs():Promise<DomestinStaffEntity[]>{
        return this.domesticStaffRepository.find();
    }

    async getOneDriver(id: string):Promise<DriverEntity>{
        const driver = await this.driverRepository.findOne({where:{id}});
        if(!driver){
            throw new NotFoundException('driver not found')
        }
        return driver
    }

    async getOneSecuirityGuard(id: string):Promise<SecuirityGuardEntity>{
        const securityGuard = await this.secuirityGuardRepository.findOne({where:{id}});
        if(!securityGuard){
            throw new NotFoundException('security not found')
        }
        return securityGuard
    }

    async getOneDomesticStaff(id: string):Promise<DomestinStaffEntity>{
        const domesticstaff = await this.domesticStaffRepository.findOne({where:{id}});
        if(!domesticstaff){
            throw new NotFoundException('domestic staff not found')
        }
        return domesticstaff;
    }
}
