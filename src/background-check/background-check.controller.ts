// src/background-check/background-check.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { BackgroundCheckService } from './background-check.service';
import { BackgroundCheckDashboardDto, CreateBackgroundCheckDto } from './background-check.dto';
import { BackgroundCheckEntity } from 'src/database/entities/background-check.entity';


@Controller('background-check')
export class BackgroundCheckController {
  constructor(private readonly backgroundCheckService: BackgroundCheckService) {}

  // Endpoint to get the background check dashboard data
  @Get('dashboard')
  async getBackgroundCheckDashboard(): Promise<BackgroundCheckDashboardDto[]> {
    return this.backgroundCheckService.getBackgroundCheckDashboard();
  }

  @Post()
  async createBackgroundChecks(
    @Body() createBackgroundChecksDto: CreateBackgroundCheckDto,
  ): Promise<BackgroundCheckEntity[]> {
    const { fullName, selectedCheckTypes, details, status } = createBackgroundChecksDto;
    return this.backgroundCheckService.createBackgroundChecks(
      fullName, selectedCheckTypes, details, status,
    );
  }
}
