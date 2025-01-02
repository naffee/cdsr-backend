import { BadGatewayException, Module } from '@nestjs/common';
import { BackgroundCheckController } from './background-check.controller';
import { BackgroundCheckService } from './background-check.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { BackgroundCheckEntity } from 'src/database/entities/background-check.entity';
import { BackgroundCheckTypeEntity } from 'src/database/entities/background_check_type.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
        BackgroundCheckEntity,
        BackgroundCheckTypeEntity,
        StaffEntity
    ]),
    
  ],
  
  providers: [BackgroundCheckService],
  controllers: [BackgroundCheckController]
})
export class BackgroundCheckModule {}

