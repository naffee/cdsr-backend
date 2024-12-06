import { Column, Entity } from 'typeorm';
import { CustomEntity } from './custom.entity';


@Entity('Case')
export class AuthEntity extends CustomEntity {
  @Column({ name: 'fullName', length: 255, unique: true, nullable: false })
  fullName: string;

  @Column({ name: 'DOB', type:'date', nullable: false})
  DOB: Date;

  @Column({ name: 'email', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ name: 'BVN', length: 11, unique: true, nullable: false })
  BVN: string;

  @Column({ name: 'NIN', length: 11, unique: true, nullable: false })
  NIN: string;

  @Column({ name: 'phoneNumber', length: 255, unique: true, nullable: false })
  phoneNumber: string;

  @Column({ name: 'password', length: 255, unique: true, nullable: false })
  password: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'refresh_token_expiry', type: 'timestamp', nullable: true })
  refreshTokenExpiry: Date;

  @Column({ name: 'password_change', default: false, nullable: true })
  passwordChange: boolean;

  @Column({ name: 'otp', length: 255, nullable: true })
  otp: string;

  @Column({ name: 'otp_expiry', type: 'date', nullable: true })
  otpExpiry: Date;


}