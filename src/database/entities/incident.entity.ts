import { Column, Entity, OneToMany, OneToOne, ManyToOne, ManyToMany } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { DriverEntity } from './driver.entity';
import { DomestinStaffEntity } from './domestic_staff.entity';
import { SecuirityGuardEntity } from './secuirity_guard.entity';

@Entity ('Incident')
export class IncidentEntity extends CustomEntity{
    @Column ({ name: 'name', length: 255, unique: true, nullable: false })
    name: string;

    @Column ({ name: 'time', type:'time' })
    time: string;

    @Column ({ name: 'image', type:'date' })
    date: Date;

    @Column ({ name: 'street', length: 255, unique: true, nullable: false })
    street: string;

    @Column ({ name: 'city', length: 255, unique: true, nullable: false })
    city: string;

    @Column ({ name: 'LGA', length: 255, unique: true, nullable: false })
    LGA: string;

    @Column ({ name: 'state', length: 255, unique: true, nullable: false })
    state: string;

    @Column ({ name: 'details', length: 255, unique: true, nullable: false })
    details: string;

    @Column ({ name: 'status', default:'PENDING', nullable: false })
    status: string;

    @Column ({ name: 'feesPaid', default: false, nullable: false })
    feesPaid: boolean;

    @Column ({ name: 'certificate', length: 255, unique: true, nullable: false })
    certificate: string;

    @ManyToMany(() => DriverEntity, (driver) => driver.incident)
    driver: DriverEntity;

    @ManyToMany(() => DomestinStaffEntity, (domesticStaff) => domesticStaff.incident)
    domesticStaff: DomestinStaffEntity;

    @ManyToMany(() => SecuirityGuardEntity, (securityGuard) => securityGuard.incident)
    securityGuard: SecuirityGuardEntity;


}