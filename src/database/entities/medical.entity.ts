import {Column, ManyToMany,Entity, ManyToOne,JoinTable} from 'typeorm'
import { CustomEntity } from './custom.entity'
import { StaffEntity } from './staff.entity'
import { MedicalCategory } from './medicai-category.entity';
import { MedicalSubCategoryEntity } from './medical-subcategory.entity';

@Entity('MedicalTest')
export class MedicalTestEntity extends CustomEntity{
    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'price', type: 'varchar' })
    price: string;

    @ManyToOne(() => MedicalCategory, (category) => category.medicalTests, { onDelete: 'CASCADE' })
    category: MedicalCategory;

    @ManyToMany(() => StaffEntity, (staff) => staff.medicalTests)
    @JoinTable()
    staff: StaffEntity[];

    @ManyToOne(() => MedicalSubCategoryEntity, (subcategory) => subcategory.tests, { onDelete: 'CASCADE', nullable: true })
    subcategory: MedicalSubCategoryEntity;

}