import {Column,Entity, OneToMany, ManyToOne} from 'typeorm'
import { CustomEntity } from './custom.entity'
import { MedicalTestEntity } from './medical.entity';
import { MedicalSubCategoryEntity } from './medical-subcategory.entity';

@Entity('MedicalCategory')
export class MedicalCategory extends CustomEntity{
    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @OneToMany(() => MedicalTestEntity, (medicalTest) => medicalTest.category)
    medicalTests: MedicalTestEntity[];

    @OneToMany(() => MedicalSubCategoryEntity, (subcategory) => subcategory.category)
    subcategories: MedicalSubCategoryEntity[];


}