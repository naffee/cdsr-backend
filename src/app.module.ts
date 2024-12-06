import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StaffListService } from './staff-list/staff-list.service';
import { StaffListController } from './staff-list/staff-list.controller';
import { StaffListModule } from './staff-list/staff-list.module';
import { BackgroundCheckService } from './background-check/background-check.service';
import { BackgroundCheckController } from './background-check/background-check.controller';
import { BackgroundCheckModule } from './background-check/background-check.module';
import { IncidentReportModule } from './incident-report/incident-report.module';
import { MedicalModule } from './medical/medical.module';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    StaffListModule,
    BackgroundCheckModule,
    IncidentReportModule,
    MedicalModule,
    DashboardModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
