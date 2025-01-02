import { Module } from '@nestjs/common';
import { IncidentReportService } from './incident-report.service';
import { IncidentReportController } from './incident-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { AuthEntity } from 'src/database/entities/auth.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      IncidentEntity,
      StaffEntity,
      AuthEntity
    ])

  ],
  providers: [IncidentReportService],
  controllers: [IncidentReportController]
})
export class IncidentReportModule {}
