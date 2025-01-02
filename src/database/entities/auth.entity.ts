import {Entity, Column,} from 'typeorm'
import { CustomEntity } from './custom.entity'
import { OneToMany } from 'typeorm';
import { IncidentEntity } from './incident.entity';

@Entity('Auth')
export class AuthEntity extends CustomEntity {
    @Column({name: 'email', length: 255, nullable: false })
    email: string;

    @Column({name: 'fullName', length: 255,  nullable: false })
    fullName: string;

    @Column({name: 'BVN', length: 11, nullable: false })
    BVN: string;

    @Column ({name: 'NIN', length: 11, nullable: false })
    NIN: string;

    @Column({name: 'DOB', type: 'date' })
    DOB: Date;

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
}