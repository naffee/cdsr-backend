import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { IncidentEntity } from './incident.entity';
import { BackgroundCheckEntity } from './background-check.entity';

@Entity('Staff')
export class StaffEntity extends CustomEntity {
  @Column ({ name: 'profileImage', length: 255, unique: true, nullable:false  })
  profileImage: string;

  @Column({ name: 'firstName', length: 255, unique: true, nullable: false })
  firstName: string;

  @Column({ name: 'middleName', length: 255, unique: true, nullable: false })
  middleName: string;

  @Column({ name: 'lastName', length: 255, unique: true, nullable: false })
  lastName: string;

  @Column({ name: 'phoneNumber', length: 255, unique: true, nullable: false })
  phoneNumber: string;

  @Column({ name: 'emailAddress', length: 255, unique: true, nullable: false })
  emailAddress: string;

  @Column({ name: 'lastKnownAddress', length: 255, unique: true, nullable: false })
  lastKnownAddress: string;

  @Column({ name: 'tribe', length: 255, unique: true, nullable: false })
  tribe: string;

  @Column({ name: 'religion', length: 255, unique: true, nullable: false })
  religion: string;

  @Column({ name: 'gender', length: 255, unique: true, nullable: false })
  gender: string;

  // @Column({ name: 'DOB', type: 'date', nullable: false })
  // DOB: Date;

  @Column({ name: 'workMode', length: 255, unique: false, nullable: false })
  workMode: string;

  @Column({ name: 'driverLicense', length: 255, unique: true, nullable: false })
  driverLicense: string;

  @Column({ name: 'fullName', select: false })
  fullName: string;


  // @Column({ name: 'licenseExpiryDate',type:'date' })
  // licenseExpiryDate: Date;

  @Column({ name: 'jobDescription', length: 255, unique: true, nullable: false })
  jobDescription: string;

  @Column({ name: 'certificate', length: 255, unique: true, nullable: false })
  certificate: string;

  @Column({ name: 'previousEmployment', length: 255, unique: false, nullable: false })
  previousEmployment: string;

  @Column({ name: 'employmentStatus', length: 255, unique: false, nullable: false })
  employmentStatus: string;

  @Column({ name: 'status', length: 255, unique: false, nullable: false })
  status: string;

  @Column({ type: 'enum',enum: ['Driver', 'Domestic Staff', 'Security Guard'] })
  staffType: 'Driver' | 'Domestic Staff' | 'Security Guard';

  // @ManyToMany(() => IncidentEntity, (incident) => incident.staffsInvolved)
  // @JoinTable()
  // incidents:IncidentEntity[];

  @OneToMany(() => IncidentEntity, (incident) => incident.PrimaryStaff)
  incidents: IncidentEntity[];

  @OneToMany(() => BackgroundCheckEntity, (backgroundCheck) => backgroundCheck.staff)
  backgroundChecks: BackgroundCheckEntity[];




}