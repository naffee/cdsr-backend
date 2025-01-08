import { Column, Entity, OneToMany, OneToOne, ManyToOne, ManyToMany } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { StaffEntity } from './staff.entity';
import { MedicalTestEntity } from './medical.entity';



@Entity ('Test-Selection')
export class TestSelectionEntity extends CustomEntity {
    @ManyToOne(() => StaffEntity, (staff) => staff.testSelections)
    staff: StaffEntity;

    @ManyToOne(() => MedicalTestEntity, (medicalTest) => medicalTest.testSelections)
    medicalTest: MedicalTestEntity;
}