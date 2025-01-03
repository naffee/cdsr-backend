import { Column, Entity, OneToMany, OneToOne, ManyToOne, ManyToMany } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { StaffEntity } from './staff.entity';
import { AuthEntity } from './auth.entity';


@Entity ('Incident')
export class IncidentEntity extends CustomEntity {

    @Column ({ name: 'time', type:'timestamp' })
    time: string;

    @Column ({ name: 'date', type:'date' })
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

    // @Column ({ name: 'feesPaid', default: false, nullable: false })
    // feesPaid: boolean;

    @Column ({ name: 'certificate', length: 255, unique: true, nullable: false })
    certificate: string;

    @Column ({ name: 'category', length: 255, unique: true, nullable: false })
    category: string;

    @Column ({ name: 'peopleInvolved', length: 255, unique: true, nullable: false })
    peopleInvolved: string;

    @Column ({ name: 'cdsrAgent', length: 255, unique: false, nullable: false })
    cdsrAgent: string;

    // @ManyToMany(() => StaffEntity, (staff) => staff.incidents)
    // staffsInvolved: StaffEntity[];

    @Column({name: 'CDSR-ID', length: 255, unique: true, nullable: false})
    incidentId: string;

     @ManyToOne(() => AuthEntity,(user) => user.reportedIncidents,
     {eager: true})
     reportedBy: AuthEntity;

    //  @ManyToOne(() => UserEntity,(user) => user.assignedIncidents,
    //  {eager: true})
    //  assignedAgent: UserEntity;

    @ManyToOne(() => StaffEntity,(staff) => staff.incidents,
    {eager: true})
    PrimaryStaff: StaffEntity;







}