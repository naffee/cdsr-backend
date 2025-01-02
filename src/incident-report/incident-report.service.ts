import { Injectable,Logger,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { IncidentDto, IncidentDashboardDto } from './incident.dto';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { AuthEntity } from 'src/database/entities/auth.entity';


@Injectable()
export class IncidentReportService {
    private readonly logger = new Logger(IncidentReportService.name);

    constructor(
        @InjectRepository(IncidentEntity)
        private readonly incidentRepository: Repository<IncidentEntity>,
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,

    ) {}

    async generateIncidentId(): Promise<string> {
        const today = new Date();
        const datePrefix = `CDSR${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getFullYear().toString().slice(2)}TH`;
    
        // Get the highest current number for incidents (regardless of date)
        const lastIncident = await this.incidentRepository
          .createQueryBuilder('incident')
          .orderBy('incident.incidentId', 'DESC')
          .getOne();
    
        // Extract the numeric part of the incident ID
        const lastNumber = lastIncident
          ? parseInt(lastIncident.incidentId.slice(-3))
          : 0;
    
        // Increment the number and pad it to 3 digits
        const newNumber = (lastNumber + 1).toString().padStart(3, '0');
    
        return `${datePrefix}${newNumber}`;
    }


    async createIncident(incidentDto:IncidentDto): Promise<IncidentEntity> {
        const staff = await this.staffRepository.findOne({ where: { fullName: incidentDto.fullName } });
        if (!staff) {
          throw new Error('Staff not found');
        }
    
        const reportedBy = await this.authRepository.findOne({ where: { fullName: incidentDto.reportedBy } });
        if (!staff) {
          throw new Error('User not found');
        }

        const incidentId = await this.generateIncidentId();
    
        const incident =  this.incidentRepository.create({
          incidentId,
          PrimaryStaff : staff,
          date: incidentDto.date,
          time: incidentDto.time,
          peopleInvolved: incidentDto.peopleInvolved,
          street: incidentDto.street,
          city: incidentDto.city,
          LGA: incidentDto.LGA,
          state: incidentDto.state,
          details: incidentDto.details,
          certificate: incidentDto.certificate,
          reportedBy: reportedBy,
          category: incidentDto.category,
          status: incidentDto.status,
          cdsrAgent: incidentDto.cdsrAgent


        });
    
        return this.incidentRepository.save(incident);
    }


    async getDashboardIncidents(): Promise<IncidentDashboardDto[]> {
        const incidents = await this.incidentRepository.find({
          select: [
            'incidentId',
            'date',
            'category',
            'reportedBy',
            'status',
            'cdsrAgent',
          ],
          relations: ['reportedBy'],
          order: {
            incidentId: 'ASC',
          },
        });
      
        return incidents.map((incident) => ({
          incidentId: incident.incidentId,
          date: incident.date.toISOString().split('T')[0],
          category: incident.category,
          reportedBy: incident.reportedBy.fullName,
          status: incident.status,
          assignedAgent: incident.cdsrAgent,
        }));
      }
      


    

    

}
