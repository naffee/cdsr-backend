// medical-test.controller.ts
import { Controller, Post, Body, Param, Get, NotFoundException } from '@nestjs/common';
import { MedicalTestService } from './medical.service';
import { CreateCategoryDto,CreateSubcategoryDto,MedicalTestDto } from './medicaltests.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medical-tests')
@Controller('medical-tests')
export class MedicalTestController {
  constructor(private readonly medicalTestService: MedicalTestService) {}

  @Post(':staffname/assign')
  async assignTestsToStaff(
    @Param('staffname') staffname: string,
    @Body('testIds') testIds: string[],
  ) {
    return await this.medicalTestService.assignTestsToStaff(staffname, testIds);
  }

  @Get(':staffname/tests')
  async getTestsForStaff(@Param('staffname') staffname: string) {
    try {
      const tests = await this.medicalTestService.getTestsForStaff(staffname);
      return tests;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

   
  @ApiTags('create-category')
  @Post('create-category')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<{ name: string }> {
    const category = await this.medicalTestService.createCategory(createCategoryDto);
    return { name: category.name }; // Return only the name field
  }

  @Post('create-subCategory')
  async createSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.medicalTestService.createSubcategory(createSubcategoryDto);
  }

  @Post(':categoryName')
  async createCategoryTest(
    @Param('categoryName') categoryName: string,
    @Body() medicalTestDto: MedicalTestDto,
  ) {
    try {
      return await this.medicalTestService.createCategoryTest(categoryName, medicalTestDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  
}

