import {Column,Entity, OneToMany, ManyToOne,JoinColumn} from 'typeorm'
import { CustomEntity } from './custom.entity'
import { MedicalTestEntity } from './medical.entity';
import { MedicalCategory } from './medicai-category.entity';

@Entity('MedicalSubCategory')
export class MedicalSubCategoryEntity extends CustomEntity{

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @ManyToOne(() => MedicalCategory, (category) => category.subcategories)
  @JoinColumn()
  category: MedicalCategory;

  @OneToMany(() => MedicalTestEntity, (test) => test.subcategory)
  tests: MedicalTestEntity[];

}