import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { BackgroundCheckEntity } from 'src/database/entities/background-check.entity';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
        BackgroundCheckEntity,
        IncidentEntity,
        StaffEntity
    ]),
    
  ],
  
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
