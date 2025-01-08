import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsArray } from "class-validator";

export class MedicalTestDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    subcategory: string;

    @ApiProperty()
    price: string;


}

export class UpdateMedicalTestDto{
    @ApiProperty()
    testName: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    subcategory: string;

    @ApiProperty()
    price: string;


}

export class CreateCategoryDto{
    @ApiProperty()
    @IsString()
    name: string;
}

export class CreateSubcategoryDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    category: string
}

export class SelectTestsForStaffDto{
    @ApiProperty({ description: 'Array of test IDs' })
    @IsArray()
    id: string[];
}