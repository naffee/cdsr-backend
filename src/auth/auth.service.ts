import { Injectable, Logger, ConflictException,BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { SignUpDto,LoginDto,UpdatePasswordNoValidDto } from './auth.dto';
import { AuthEntity } from 'src/database/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonResponse } from 'src/helper/common.response';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    async getJwtToken(user: AuthEntity):Promise<any>{
        this.logger.log(`Generating JWT for user ${user.email}`);
        const payload = {
            email : user.email,
            fullname : user.fullName,
            BVN: user.BVN,
            NIN: user.NIN,
            DOB: user.DOB
        }

        // Generate Access Token
        const token = this.jwtService.sign(payload);
    
        // Generate Refresh Token
        const refreshToken = uuidv4();
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 1);
    
        // Update user with refresh token information
        await this.authRepository.update(user.id, {
          refreshToken: refreshToken,
          refreshTokenExpiry: refreshTokenExpiry,
        });
    
        return {
          user: user,
          token: token,
          refreshToken: refreshToken,
        };
    }

    async sendOtp(user: AuthEntity):Promise<void>{
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 20 * 60 * 1000);
    
        await this.authRepository.update(user.id, { otp, otpExpiry });
    
        await this.mailService.sendMail({
          to: user.email,
          subject: 'Your OTP Code',
          text: `Your OTP code is ${otp}. It will expire in 20 minutes.`,
        });
    }

    async resendOtp(email: string):Promise<void>{
        const user = await this.authRepository.findOne({
            where: { email },
          });
      
          if (!user) {
            throw new UnauthorizedException('User not found');
          }
      
          return await this.sendOtp(user);
    }

    async verifyOtp(email: string, otp: string):Promise<any>{
        const user = await this.authRepository.findOne({
            where: { email },
          });
      
          if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
            throw new UnauthorizedException('Invalid or expired OTP');
          }
      
          await this.authRepository.update(user.id, { otp: null, otpExpiry: null });
      
          await this.mailService.sendMail({
            to: user.email,
            subject: 'You have logged into your account',
            text: `A user just logged into your account. If this wasn't you, please contact the admin to restrict your account.`,
          });
      
          return await this.getJwtToken(user);
    }


    async signUp(signUpDto: SignUpDto):Promise <CommonResponse>{
        const existingUser = this.authRepository.findOne({where:{email: signUpDto.email}}) 

        if (existingUser){
            throw new ConflictException ('Already registered')
        }

        if (signUpDto.password !== signUpDto.confirmPassword){
            throw new BadRequestException('password and comfirmPassword must be the same')
        }

        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

        const newUser = this.authRepository.create({...signUpDto, password : hashedPassword})

        await this.authRepository.save(newUser)

        return {
            statusCode: 201,
            message:'You have successfully signed up',
            data: newUser
        }


    }

    async login(email: string, password: string):Promise<CommonResponse>{
        this.logger.log(`Attempting login for user with email ${email}`);

        try {
            const user = await this.authRepository.findOne({where:{
                email : email
            }})

            if (user && (await bcrypt.compare(password, user.password)) ) {
                //await this.sendOtp(user)
                //return {message: 'OTP sent to your email. Verify to continue'}
                return await this.getJwtToken(user);
            } else{
                throw new UnauthorizedException ('Invalid Credentials')
            }   
        } catch (e) {
                this.logger.error(`Login failed: ${e.message}`);
                throw new UnauthorizedException('Invalid credentials') 
        }; 
    }

    // async updatePassword(updatePassword: UpdatePasswordNoValidDto):Promise<CommonResponse>{
    //     const user = this.authRepository.findOne({where:{id: updatePassword.id}})

    //     if(!user){
    //         throw new NotFoundException('User not found')
    //     }

    //     // if (updatePassword.newPassword !== updatePassword.confirmNewPassword){
    //     //     throw new BadRequestException('password and comfirmPassword must be the same')
    //     // }

    //     const hashedNewPassword = await bcrypt.hash(
    //         updatePassword.newPassword,
    //         10,
    //       );
    //     (await user).password = hashedNewPassword;
    //     (await user).passwordChange = true;
      
    //     await this.authRepository.save(user);
      
    //     return {
    //         statusCode: 200,
    //         message: 'Password updated successfully',
    //         data: null,
    //     };


    // }



}