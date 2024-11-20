import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Length, ValidateNested } from 'class-validator';

export class IncidentDto{
    @ApiProperty({example:'9', description: 'id of the staff'})
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({example: 'Jane Doe', description: 'name of staff'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example:'9:00', description:'time of the incident'})
    @IsNotEmpty()
    @IsString()
    time: string;

    @ApiProperty({example: '2nd January, 2024', description: 'date of the incident'})
    @IsNotEmpty()
    @IsDate()
    date: string;

    @ApiProperty({example: 'no 4 nowhere road', description: 'street of the incident'})
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({example:'Lagos', description: 'city of the incident'})
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({example: 'AMAC', description:'local government area of the incident'})
    @IsNotEmpty()
    @IsString()
    LGA: string;

    @ApiProperty({example: 'Lagos State', description: 'state of the incident'})
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({example: 'A computer was stolen', description: ' description of incident'})
    @IsNotEmpty()
    @IsString()
    details: string;

    @ApiProperty({example: 'Jane, John', description: 'people involved in the incident'})
    @IsNotEmpty()
    @IsString()
    peopleInvolved: string;

    @ApiProperty({example: 'https//:certificate.com'})
    @IsNotEmpty()
    @IsUrl()
    certificate: string;
}