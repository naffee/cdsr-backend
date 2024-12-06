import { Injectable,Logger,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { IncidentDto } from './incident.dto';


@Injectable()
export class IncidentReportService {}
