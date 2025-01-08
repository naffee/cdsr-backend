import { Controller,Post,UseGuards,Body,Param,UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/helper/guards/jwt-auth.guard';
import { CommonResponse } from 'src/helper/common.response';
import { ApiBearerAuth,ApiBody,ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto,LoginDto,VerifyOtpDto,ResendOtpDto } from './auth.dto';
import { CreateStaffDto } from 'src/staff-list/staff-list.dto';
import { Roles } from 'src/helper/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/helper/guards/roles.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

     @ApiBearerAuth()
     @UseGuards(JwtAuthGuard,RolesGuard)
     @ApiTags('Auth')
     @Post('login')
     @Roles('EMPLOYER')
     async loginEmployer(@Body() loginDto: LoginDto): Promise<any> {
     try {
       return await this.authService.loginEmployer(
         loginDto.email,
         loginDto.password,
       );
     } catch (error) {
       throw new UnauthorizedException('Login failed, Invalid credentials');
     }
     }

     @ApiBearerAuth()
     @UseGuards(JwtAuthGuard,RolesGuard)
     @ApiTags('Auth')
     @Post('login-Employee')
     @Roles('EMPLOYEE')
     async loginEmployee(@Body() loginDto: LoginDto): Promise<any> {
     try {
       return await this.authService.loginEmployee(
         loginDto.email,
         loginDto.password,
       );
     } catch (error) {
       throw new UnauthorizedException('Login failed, Invalid credentials');
     }
     }

    // @ApiTags('Auth')
    // @Post('verify-otp')
    // @ApiOperation({ summary: 'Verify OTP and generate JWT token' })
    // @ApiBody({ type: VerifyOtpDto })
    // @ApiResponse({ status: 200, description: 'OTP verified, token generated.' })
    // async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<CommonResponse> {
    //     const { email, otp } = verifyOtpDto;
    //     return await this.authService.verifyOtp(email, otp);
    // }

    // @ApiTags('Auth')
    // @Post('resend-otp')
    // @ApiOperation({ summary: 'Resend OTP' })
    // @ApiBody({ type: ResendOtpDto })
    // @ApiResponse({ status: 200, description: 'OTP resent to your email.' })
    // async resendOtp(@Body() resendOtpDto: ResendOtpDto): Promise<void> {
    //     const { email } = resendOtpDto;
    //     return await this.authService.resendOtp(email);
    // }

    @ApiTags('Register')
    @Post('register-user')
    async registerEmployer(
    @Body() signUpDto: SignUpDto,
    ): Promise<CommonResponse> {
        return this.authService.signUpEmployer(signUpDto);
    }
    
    @ApiTags('Register')
    @Post('register-employee')
    async registerEmployee(
    @Body() signUpDto: CreateStaffDto,
    ): Promise<CommonResponse> {
        return this.authService.signUpEmployee(signUpDto);
    }         

}
