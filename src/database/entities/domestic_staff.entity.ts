import { Column, Entity, OneToMany, OneToOne,ManyToMany,JoinTable } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { IncidentEntity } from './incident.entity';

@Entity('Case')
export class DomestinStaffEntity extends CustomEntity {
  @Column({ name: 'image', length: 255, unique: true, nullable: false })
  image: string;

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

  @Column({ name: 'DOB', type: 'date', nullable: false })
  DOB: Date;

  @Column({ name: 'workMode', length: 255, unique: false, nullable: false })
  workMode: string;

  @Column({ name: 'driverLicense', length: 255, unique: true, nullable: false })
  driverLicense: string;

  @Column({ name: 'licenseExpiryDate',type:'date' })
  licenseExpiryDate: Date;

  @Column({ name: 'jobDescription', length: 255, unique: true, nullable: false })
  jobDescription: string;

  @Column({ name: 'certificate', length: 255, unique: true, nullable: false })
  certificate: string;

  @Column({ name: 'previousEmployment', length: 255, unique: false, nullable: false })
  previousEmployment: string;

  @ManyToMany(() => IncidentEntity, (incident) => incident.domesticStaff)
  @JoinTable()
  incident:IncidentEntity;




}