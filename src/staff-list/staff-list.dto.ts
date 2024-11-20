import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Length, ValidateNested } from 'class-validator';

export class CreateDomesticStaffDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
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
    lastKnowwnAddress: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    DOB: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    workMode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driverLicense: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    licenseExpiryDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    jobDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    certificate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    previousEmployment: string;


}

export class CreateSecuirityGuardDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
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
    lastKnowwnAddress: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    DOB: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    workMode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driverLicense: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    licenseExpiryDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    jobDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    certificate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    previousEmployment: string;


}

export class CreateDriverDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
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
    lastKnowwnAddress: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    DOB: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    workMode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driverLicense: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    licenseExpiryDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    jobDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    certificate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    previousEmployment: string;


}