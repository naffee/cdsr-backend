import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from 'src/database/entities/driver.entity';
import { DomestinStaffEntity } from 'src/database/entities/domestic_staff.entity';
import { SecuirityGuardEntity } from 'src/database/entities/secuirity_guard.entity';
import { IncidentEntity } from 'src/database/entities/incident.entity';
import { StaffListController } from './staff-list.controller';
import { StaffListService } from './staff-list.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SecuirityGuardEntity,DomestinStaffEntity,DriverEntity,IncidentEntity
        ])
    ],
    controllers: [StaffListController],
    providers: [StaffListService]
})
export class StaffListModule {}
