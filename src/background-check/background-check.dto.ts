import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class BackgroundCheckDashboardDto {
    @ApiProperty()
    @IsString()
    staffName: string;

    @ApiProperty()
    @IsDate()
    backgroundCheckDate: Date;

    @ApiProperty()
    @IsString()
    jobRole: string;

    // @ApiProperty()
    // @IsString()
    // employer: string;
    
    @ApiProperty()
    @IsString()
    workMode: string;

    @ApiProperty()
    @IsString()
    status: string;
}

export class CreateBackgroundCheckDto {
    @ApiProperty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsString()
    selectedCheckTypes: string[];

    @ApiProperty()
    @IsString()
    details: string[];

   
    @ApiProperty()
    @IsString()
    status: string;

}
  