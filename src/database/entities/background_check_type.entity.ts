import { Entity, OneToMany, Column } from 'typeorm';
import {CustomEntity} from './custom.entity';
import { BackgroundCheckEntity } from './background-check.entity';

@Entity('background_check_types')
export class BackgroundCheckTypeEntity extends CustomEntity {

  @Column()
  name: string;  // Name of the background check type (e.g., "Employment History", "Criminal History")

  @OneToMany(() => BackgroundCheckEntity, (backgroundCheck) => backgroundCheck.checkType)
  backgroundChecks: BackgroundCheckEntity[];
}
