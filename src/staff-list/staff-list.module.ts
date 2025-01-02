import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { StaffListController } from './staff-list.controller';
import { StaffListService } from './staff-list.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            StaffEntity,IncidentEntity
        ])
    ],
    controllers: [StaffListController],
    providers: [StaffListService]
})
export class StaffListModule {}
