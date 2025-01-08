import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Length, ValidateNested,IsEnum, IsStrongPassword,IsIn } from 'class-validator';

export class CreateStaffDto{
        @ApiProperty()
        @IsString()
        firstName: string;
    
        @ApiProperty()
        @IsString()
        middleName: string;
    
        @ApiProperty()
        @IsString()
        lastName: string;
    
        @ApiProperty()
        @IsDate()
        DOB: Date;
    
        @ApiProperty()
        @IsString()
        email: string;
    
        @ApiProperty()
        @IsString()
        googleAddress: string;
    
        @ApiProperty()
        @IsString()
        nationality: string;
    
        @ApiProperty()
        @IsString()
        phoneNumber: string;
    
        @ApiProperty()
        @IsString()
        stateOfOrigin: string;
    
        @ApiProperty()
        @IsString()
        LGA: string;
    
        @ApiProperty()
        @IsString()
        religion: string;
    
        @ApiProperty()
        @IsString()
        gender: string;
    
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
    
        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        @IsIn(['Employer','Employee','Government Body','Medical Sector'])
        role: string;

        @ApiProperty({ example: 'Driver || Domestic Staff || Security Guard'  })
        @IsEnum(['Driver', 'Domestic Staff', 'Security Guard'])
        staffType: 'Driver' | 'Domestic Staff' | 'Security Guard';


}