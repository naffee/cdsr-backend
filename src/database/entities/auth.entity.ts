import {Entity, Column,OneToMany,ManyToMany,JoinTable,BeforeInsert} from 'typeorm'
import { CustomEntity } from './custom.entity'
import { IncidentEntity } from './incident.entity';
import { RolesEntity } from './roles.entity';

@Entity('Auth')
export class AuthEntity extends CustomEntity {
    @Column({name: 'firstName', length: 255, nullable: false })
    firstName: string;

    @Column({name: 'middleName', length: 255, nullable: true })
    middleName: string;

    @Column({name: 'lastName', length: 255, nullable: false })
    lastName: string;
    
    @Column({name: 'email', length: 255, nullable: false })
    email: string;

    @Column({name: 'fullName', length: 255,  nullable: false })
    fullName: string;

    @BeforeInsert()
    setfullName() {
      this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`;}
    

    @Column({name: 'DOB', type: 'date' })
    DOB: Date;

    @Column({name: 'phoneNumber', length: 11, nullable: false })
    phoneNumber: string;

    @Column({name: 'googleAddress', length: 255, nullable: false })
    googleAddress: string;

    @Column({name: 'nationality', length: 255, nullable: false })
    nationality: string;

    @Column({name: 'stateOfOrigin', length: 255, nullable: false })
    stateOfOrigin: string;

    @Column({name: 'LGA', length: 255, nullable: false })
    LGA: string;

    @Column({name: 'religion', length: 255, nullable: false })
    religion: string
    
    @Column({name: 'gender', length: 255, nullable: false })
    gender: string;

    @Column({name: 'password', length: 255, nullable: false })
    password: string;

    @Column({name: 'refreshToken', length: 255, nullable: true })
    refreshToken: string;

    @Column({name: 'refreshTokenExpiry', type: 'date', nullable: true })
    refreshTokenExpiry: Date;

    // @Column({name: 'otp', length: 4 })
    // otp: string;

    // @Column({name: 'otpExpiry', type: 'timestamp' })
    // otpExpiry: Date;

    @OneToMany(() => IncidentEntity, (incident) => incident.reportedBy)
    reportedIncidents: IncidentEntity[];

    @ManyToMany(() => RolesEntity, (role) => role.users, {eager: true})
    @JoinTable()
    roles:RolesEntity[];
}