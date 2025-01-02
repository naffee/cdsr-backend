import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BackgroundCheckEntity } from 'src/database/entities/background-check.entity';
import { BackgroundCheckTypeEntity } from 'src/database/entities/background_check_type.entity';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { BackgroundCheckDashboardDto } from './background-check.dto';

@Injectable()
export class BackgroundCheckService {
  constructor(
    @InjectRepository(BackgroundCheckEntity)
    private readonly backgroundCheckRepository: Repository<BackgroundCheckEntity>,
    @InjectRepository(BackgroundCheckTypeEntity)
    private readonly backgroundCheckTypeRepository: Repository<BackgroundCheckTypeEntity>,
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async createBackgroundChecks(fullName: any, selectedCheckTypes: string[], details: string[], status: string): Promise<BackgroundCheckEntity[]> {
    const staff = await this.staffRepository.findOne(fullName);
    if (!staff) {
      throw new Error('Staff not found');
    }

    // Fetch the selected background check types
    const checkTypes = await this.backgroundCheckTypeRepository.find({
        where: {
          id: In(selectedCheckTypes),  // 'In' is used to match any of the selected IDs
        },
      });
      if (checkTypes.length !== selectedCheckTypes.length) {
        throw new Error('One or more background check types not found');
      }

    // Create and save the background check entries
    const backgroundChecks = checkTypes.map((checkType, index) => {
      const backgroundCheck = new BackgroundCheckEntity();
      backgroundCheck.staff = staff;
      backgroundCheck.checkType = checkType;
      backgroundCheck.details = details[index];  // Assuming details are passed in the same order
      backgroundCheck.checkDate = new Date();  // Set current date for the check
      backgroundCheck.status = status
      return backgroundCheck;
    });

    return this.backgroundCheckRepository.save(backgroundChecks);
  }

  async getBackgroundCheckDashboard(): Promise<BackgroundCheckDashboardDto[]> {
    const backgroundChecks = await this.backgroundCheckRepository.find({
      relations: [
        'staff', // Join staff
        'checkType', // Join background check types
        'staff.jobRole', // Join job role (assuming it's a relation in Staff entity)
        //'staff.employer', // Join employer (assuming it's a relation in Staff entity)
      ],
    });

    return backgroundChecks.map((backgroundCheck) => {
      const staff = backgroundCheck.staff;
      return {
        staffName: `${staff.firstName} ${staff.lastName}`,
        backgroundCheckDate: backgroundCheck.checkDate,
        jobRole: staff.staffType, // Assuming jobRole is a relation in staff
        //employer: staff.employer ? staff.employer.name : 'N/A', // Assuming employer is a relation in staff
        workMode: staff.workMode, // Assuming staff entity has workMode
        status: backgroundCheck.status, // Assuming status is a field in backgroundCheck entity
      };
    });
  }
}

