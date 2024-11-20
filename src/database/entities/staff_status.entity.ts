import { Entity, Column } from 'typeorm';
import { CustomEntity } from './custom.entity';

@Entity()
export class StaffStatus extends CustomEntity {
  @Column()
  name: string;
}
