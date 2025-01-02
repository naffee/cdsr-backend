import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async getStaff(){
        return this.dashboardService.getStaff
    }

    @Get()
    async getBackgroungCheck(){
        return this.dashboardService.getBackgroundChecks
    }
}
