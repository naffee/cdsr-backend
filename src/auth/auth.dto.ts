import { ApiProperty } from "@nestjs/swagger";
import { IsString,isEmail,isStrongPassword,isNotEmpty, IsDate, IsStrongPassword, ValidateIf, Matches,IsNotEmpty } from "class-validator";

export class SignUpDto{
    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsDate()
    DOB: Date;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    BVN: string;

    @ApiProperty()
    @IsString()
    NIN: string;

    @ApiProperty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsStrongPassword({
        minLength:8,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1
    },{
        message:'Password must be at least 8 characters long, must incude 1 uppercase, 1 number, and 1 special character'
    })
    password : string;
    

    @ApiProperty()
    @IsString()
    @IsStrongPassword()
    //@ValidateIf((dto)=> password === dto.confirmPassword)
    confirmPassword: string;

}

export class LoginDto{
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class VerifyOtpDto {
    @ApiProperty({ example: 'john.doe@gov.ng' })
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @ApiProperty({ example: '1234' })
    @IsNotEmpty()
    @IsString()
    otp: string;
}
  
export class ResendOtpDto {
    @ApiProperty({ example: 'john.doe@gov.ng' })
    @IsNotEmpty()
    @IsString()
    email: string;
}

export class UpdatePasswordNoValidDto {
    @ApiProperty({ example: '7' })
    @IsNotEmpty()
    @IsString()
    id: string;
  
    
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    @IsStrongPassword({
        minLength:8,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1
    },{
        message:'Password must be at least 8 characters long, must incude 1 uppercase, 1 number, and 1 special character'
    })
    newPassword : string;

    @ApiProperty()
    @IsString()
    @IsStrongPassword()
    //@ValidateIf((dto)=> password === dto.confirmPassword)
    confirmNewPassword: string;
  }