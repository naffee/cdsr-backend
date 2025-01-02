// src/background-check/background-check.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BackgroundCheckTypeEntity } from './background_check_type.entity';
import { StaffEntity } from './staff.entity';
import { CustomEntity } from './custom.entity';

@Entity('background_checks')
export class BackgroundCheckEntity {
  @PrimaryGeneratedColumn()
  id: number;  // Unique ID for each background check

  // Many background checks can be associated with one staff member
  @ManyToOne(() => StaffEntity, (staff) => staff.backgroundChecks)
  staff: StaffEntity;

  // Many background checks can belong to one check type (Employment, Medical, etc.)
  @ManyToOne(() => BackgroundCheckTypeEntity, (checkType) => checkType.id)
  checkType: BackgroundCheckTypeEntity;

  @Column('text')
  details: string;  // Details of the background check (e.g., employment history or criminal record)

  @Column({name: 'status'})
  status: string;

  @Column({ type: 'timestamp' })
  checkDate: Date;  // The date the background check was conducted
}
