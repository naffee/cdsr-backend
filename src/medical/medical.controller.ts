// medical-test.controller.ts
import { Controller, Post, Body, Param, Get, NotFoundException,Patch } from '@nestjs/common';
import { MedicalTestService } from './medical.service';
import { CreateCategoryDto,CreateSubcategoryDto,MedicalTestDto,SelectTestsForStaffDto } from './medicaltests.dto';
import { ApiTags,ApiParam } from '@nestjs/swagger';

@ApiTags('medical-tests')
@Controller('medical-tests')
export class MedicalTestController {
  constructor(private readonly medicalTestService: MedicalTestService) {}

  // @Post(':staffName/assign')
  // async assignTestsToStaff(
  //   @Param('staffName') staffName: string,
  //   @Body('testName') testName: string[],
  // ) {
  //   return await this.medicalTestService.assignTestsToStaff(staffName, testName);
  // }

  // @Get(':staffname/tests')
  // async getTestsForStaff(@Param('staffname') staffname: string) {
  //   try {
  //     const tests = await this.medicalTestService.getTestsForStaff(staffname);
  //     return tests;
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }

   
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

  // 
  @Post(':fullName/select-tests')
  async selectTestsForStaff(
    @Param('fullName') fullName: string,  // Route parameter
    @Body() body: SelectTestsForStaffDto  // Only id in the body
  ) {
    const { id } = body;  // Get 'id' from the body
    await this.medicalTestService.selectTestsForStaff(fullName, id); // Call the service
    return { message: 'Tests selected successfully' };
  }

  @Get(':fullName/tests')
  @ApiParam({ name: 'fullName', description: 'Full name of the staff' })
  async getTestsForStaff(@Param('fullName') fullName: string) {
  const { tests, totalPrice } = await this.medicalTestService.getTestsForStaff(fullName);
  return { tests, totalPrice };
}



  @Patch(':fullName/remove-tests')
  async removeTestsForStaff(
  @Param('fullName') fullName: string,
  @Body('testIdsToRemove') testIdsToRemove: string[]
) {
  const result = await this.medicalTestService.removeTestsForStaff(fullName, testIdsToRemove);
  return {
    message: 'Tests removed successfully',
    tests: result.tests,
    totalPrice: result.totalPrice,
  };
  }


//   @Patch(':fullName/add-tests')
//   async addTestsForStaff(
//   @Param('fullName') fullName: string,
//   @Body() body: SelectTestsForStaffDto,  // Only id in the body
// ) {
//   const { id } = body;  // Get 'id' from the body

//   // Call the service to add tests for the staff
//   const result = await this.medicalTestService.addTestsForStaff(fullName, id);

//   return {
//     message: 'Tests added successfully',
//     tests: result.tests,
//     totalPrice: result.totalPrice,
//   };

// }




  
}

