import { Module } from '@nestjs/common';
import { IncidentReportService } from './incident-report.service';
import { IncidentReportController } from './incident-report.controller';

@Module({
  providers: [IncidentReportService],
  controllers: [IncidentReportController]
})
export class IncidentReportModule {}
