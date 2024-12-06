import { Module } from '@nestjs/common';
import { IncidentReportService } from './incident-report.service';
import { IncidentReportController } from './incident-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/database/entities/driver.entity';
import { SecuirityGuardEntity } from 'src/database/entities/secuirity_guard.entity';
import { DomestinStaffEntity } from 'src/database/entities/domestic_staff.entity';
import { IncidentEntity } from 'src/database/entities/incident.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      IncidentEntity,
      DriverEntity,
      DomestinStaffEntity,
      SecuirityGuardEntity

    ])

  ],
  providers: [IncidentReportService],
  controllers: [IncidentReportController]
})
export class IncidentReportModule {}
