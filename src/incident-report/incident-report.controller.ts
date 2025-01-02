import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IncidentReportService } from './incident-report.service';
import { IncidentDashboardDto,IncidentDto } from './incident.dto';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { ApiBearerAuth,ApiOperation,ApiResponse } from '@nestjs/swagger';

@Controller('incident-report')
export class IncidentReportController {
  constructor(private readonly incidentService: IncidentReportService) {}

  

  @Post()
  @ApiOperation({ summary: 'Create a new incident report' })
  @ApiResponse({
    status: 201,
    description: 'The incident has been successfully created.',
    type: IncidentEntity,  // Return the incident entity
  })
  async createIncident(@Body() incidentDto: IncidentDto): Promise<IncidentEntity> {
    return this.incidentService.createIncident(incidentDto);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get the list of incidents for the dashboard' })
  @ApiResponse({
    status: 200,
    description: 'List of incidents for the dashboard.',
    type: [IncidentDashboardDto],  // Return an array of IncidentDashboardDto
  })
  async getDashboardIncidents(): Promise<IncidentDashboardDto[]> {
    return this.incidentService.getDashboardIncidents();
  }
}



