import { Injectable,Logger,UnauthorizedException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffDto, } from './staff-list.dto';
import { StaffEntity } from 'src/database/entities/staff.entity';

@Injectable()
export class StaffListService {
    private readonly logger = new Logger(StaffListService.name);

    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,

    ) {}

    async createStaff(createStaffDto: CreateStaffDto):Promise<StaffEntity>{
        const newStaff = this.staffRepository.create(createStaffDto)
        return this.staffRepository.save(newStaff);

    };

    async getAllStaff():Promise<StaffEntity[]>{
        return this.staffRepository.find();
    }

    async getOneStaff(id: string):Promise<StaffEntity>{
        const staff = await this.staffRepository.findOne({where:{id}});
        if(!staff){
            throw new NotFoundException('staff not found')
        }
        return staff
    }

}
