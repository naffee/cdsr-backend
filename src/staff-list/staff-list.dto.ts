import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Length, ValidateNested,IsEnum } from 'class-validator';

export class CreateStaffDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profileImage: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    middleName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emailAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastKnownAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Nationality: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stateOfOrigin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    LGA: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tribe: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    religion: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // DOB: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    workMode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driverLicense: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // licenseExpiryDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    jobDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    certificate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    previousEmployment: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    employmentStatus: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({ example: 'Driver || Domestic Staff || Security Guard'  })
    @IsEnum(['Driver', 'Domestic Staff', 'Security Guard'])
    staffType: 'Driver' | 'Domestic Staff' | 'Security Guard';


}