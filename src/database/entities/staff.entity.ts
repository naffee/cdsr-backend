import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, BeforeInsert } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { IncidentEntity } from './incident.entity';
import { BackgroundCheckEntity } from './background-check.entity';
//import { MedicalTestEntity } from './medical.entity';
import { TestSelectionEntity } from './test-selection.entity';
import { RolesEntity } from './roles.entity';


@Entity('Staff')
export class StaffEntity extends CustomEntity {

  @Column({ name: 'firstName', length: 255, unique: true, nullable: false })
  firstName: string;

  @Column({ name: 'middleName', length: 255, unique: true, nullable: false })
  middleName: string;

  @Column({ name: 'lastName', length: 255, unique: true, nullable: false })
  lastName: string;

  @Column({ name: 'phoneNumber', length: 255, unique: true, nullable: false })
  phoneNumber: string;

  @Column({ name: 'email', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ name: 'googleAddress', length: 255, unique: true, nullable: false })
  googleAddress: string;

  @Column({ name: 'password', length: 255, unique: true, nullable: false })
  password: string;

  @Column({ name: 'gender', length: 255, unique: true, nullable: false })
  gender: string;

  // @Column({ name: 'DOB', type: 'date', nullable: false })
  // DOB: Date;

  @Column({ name: 'fullName', select: false })
  fullName: string;

  @BeforeInsert()
  setFullName() {
  this.fullName = `${this.firstName} ${this.lastName}`;}

  @Column({name: 'refreshToken', length: 255, nullable: true })
  refreshToken: string;

  @Column({name: 'refreshTokenExpiry', type: 'date', nullable: true })
  refreshTokenExpiry: Date;

    // @Column({name: 'otp', length: 4 })
    // otp: string;

    // @Column({name: 'otpExpiry', type: 'timestamp' })
    // otpExpiry: Date;

  @Column({ type: 'enum',enum: ['Driver', 'Domestic Staff', 'Security Guard'] })
  staffType: 'Driver' | 'Domestic Staff' | 'Security Guard';

  // @ManyToMany(() => IncidentEntity, (incident) => incident.staffsInvolved)
  // @JoinTable()
  // incidents:IncidentEntity[];

  @OneToMany(() => IncidentEntity, (incident) => incident.PrimaryStaff)
  incidents: IncidentEntity[];

  @OneToMany(() => BackgroundCheckEntity, (backgroundCheck) => backgroundCheck.staff)
  backgroundChecks: BackgroundCheckEntity[];

  // @ManyToMany(() => MedicalTestEntity, (medicalTest) => medicalTest.staff)
  // medicalTests: MedicalTestEntity[];

  @OneToMany(() => TestSelectionEntity, (testSelection) => testSelection.staff)
  testSelections: TestSelectionEntity[];

  @ManyToMany(() => RolesEntity, (role) => role.employee, {eager: true})
  @JoinTable()
  roles:RolesEntity[];






}