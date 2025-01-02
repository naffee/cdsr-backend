import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Length, ValidateNested } from 'class-validator';
import { AuthEntity } from 'src/database/entities/auth.entity';

export class IncidentDto{

    @ApiProperty({description:'Full name of staff'})
    @IsNotEmpty()
    @IsString()
    fullName: string;
    
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

    @ApiProperty({description:'Full name of reporter of the staff'})
    @IsNotEmpty()
    @IsString()
    reportedBy: string;

    @ApiProperty({description:'Category of the incident'})
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({description:'Status of the case'})
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({description:'Name of agent assigned to the case'})
    @IsNotEmpty()
    @IsString()
    cdsrAgent: string;
}

export class IncidentDashboardDto{
    @ApiProperty({description:'Id of incident'})
    @IsNotEmpty()
    @IsString()
    incidentId: string;
    
    @ApiProperty({description:'Date the incident was reported'})
    @IsNotEmpty()
    @IsString()
    date: string;

    @ApiProperty({description:'category of incident'})
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({description:'Reporter of incident'})
    @IsNotEmpty()
    @IsString()
    reportedBy: string;

    @ApiProperty({description:'status of incident'})
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({description:'Agent assigned to incident'})
    @IsNotEmpty()
    @IsString()
    assignedAgent: string;
}