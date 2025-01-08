// medical-test.service.ts
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalTestEntity } from 'src/database/entities/medical.entity';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { In } from 'typeorm';
import { MedicalSubCategoryEntity } from 'src/database/entities/medical-subcategory.entity';
import { MedicalCategory } from 'src/database/entities/medicai-category.entity';
import { CreateCategoryDto,CreateSubcategoryDto,MedicalTestDto, UpdateMedicalTestDto } from './medicaltests.dto';
import { TestSelectionEntity } from 'src/database/entities/test-selection.entity';

@Injectable()
export class MedicalTestService {
  constructor(
    @InjectRepository(MedicalTestEntity)
    private readonly medicalTestRepository: Repository<MedicalTestEntity>,
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
    @InjectRepository(MedicalCategory)
    private readonly categoryRepository: Repository<MedicalCategory>,
    @InjectRepository(MedicalSubCategoryEntity)
    private readonly subcategoryRepository: Repository<MedicalSubCategoryEntity>,
    @InjectRepository(TestSelectionEntity)
    private readonly testSelectionRepository: Repository<TestSelectionEntity>,
  ) {}

  // async assignTestsToStaff(staffName: string, testName: string[]): Promise<StaffEntity> {
  //   const staff = await this.staffRepository.findOne({ where: { fullName: staffName}, relations:  ['medicalTests'] });
  //   if (!staff) {
  //     throw new Error('Staff not found');
  //   }

  //   const tests = await this.medicalTestRepository.find({
  //       where: { name: In(testName) },
  //     });
      
  //     if (!tests.length) {
  //       throw new Error('No valid tests found');
  //     }
      

  //   staff.medicalTests = [...staff.medicalTests, ...tests]; // Add the tests to the staff's list
  //   return await this.staffRepository.save(staff);
  // }

  // // medical-test.service.ts
  // async getTestsForStaff(staffname: string): Promise<MedicalTestEntity[]> {
  //   const staff = await this.staffRepository.findOne({
  //     where: { fullName: staffname },
  //     relations: ['medicalTests'],
  //   });
  //   if (!staff) {
  //     throw new Error('Staff not found');
  //   }
  //   return staff.medicalTests;
  // }

  async createCategory(dto: CreateCategoryDto): Promise<MedicalCategory> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async createSubcategory(dto: CreateSubcategoryDto): Promise<MedicalSubCategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { name: dto.category } });
    if (!category) {
      throw new Error('Category not found');
    }

    const subcategory = this.subcategoryRepository.create({ ...dto, category });
    return this.subcategoryRepository.save(subcategory);
  }

  async createCategoryTest(
    categoryName: string,
    dto: MedicalTestDto,
  ): Promise<MedicalTestEntity> {
    // Find the category by name
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      throw new NotFoundException(`Category "${categoryName}" not found.`);
    }
  
    // Find the subcategory by name (if provided)
    let subcategory = null;
    if (dto.subcategory) {
      subcategory = await this.subcategoryRepository.findOne({
        where: { name: dto.subcategory },
      });
  
      if (!subcategory) {
        throw new NotFoundException(
          `Subcategory "${dto.subcategory}" not found.`,
        );
      }
    }
  
    // Create the test entity with the resolved category and optional subcategory
    const test = this.medicalTestRepository.create({
      ...dto,
      category,
      subcategory: subcategory || null, // Make subcategory optional
    });
  
    // Save the test and return the result
    return this.medicalTestRepository.save(test);
  }
  
  async selectTestsForStaff(fullName: any, id:string[]): Promise<void> {
    const staff = await this.staffRepository.findOne({ where: { fullName: fullName },});
    if (!staff) {
      throw new Error('Staff not found');
    }

    const tests = await this.medicalTestRepository.find({where: {id: In(id)}});
    if (tests.length !== id.length) {
      throw new Error('Some tests not found');
    }

    const testSelections = tests.map((test) => {
      const testSelection = new TestSelectionEntity();
      testSelection.staff = staff;
      testSelection.medicalTest = test;
      return testSelection;
    });

    await this.testSelectionRepository.save(testSelections);
  }

  // async getTestsForStaff(fullName: string): Promise<{ tests: any[]; totalPrice: number }> {
  //   const staff = await this.staffRepository.findOne({ where: { fullName } });
  //   if (!staff) {
  //     throw new NotFoundException('Staff not found');
  //   }
  
  //   const testSelections = await this.testSelectionRepository.find({
  //     where: { staff },
  //     relations: ['medicalTest', 'medicalTest.category', 'medicalTest.category.subcategory'],
  //   });
  
  //   const tests = testSelections.map((testSelection) => {
  //     const subcategoryNames = testSelection.medicalTest.category.subcategories
  //       ?.map((subcat) => subcat.name)
  //       .join(', ') || null;
    
  //     return {
  //       testName: testSelection.medicalTest.name,
  //       testPrice: testSelection.medicalTest.price,
  //       testCategory: testSelection.medicalTest.category.name,
  //       testSubcategories: subcategoryNames, // Adjusted to handle multiple subcategories
  //     };
  //   });
    
    
  
  //   const totalPrice = tests.reduce((sum, test) => sum + Number(test.testPrice), 0);

  
  //   return { tests, totalPrice };
  // }

  async getTestsForStaff(fullName: string): Promise<{ tests: any[]; totalPrice: number }> {
    const staff = await this.staffRepository.findOne({ where: { fullName } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
  
    // const testSelections = await this.testSelectionRepository.find({
    //   where: { staff },
    //   relations: ['medicalTest', 'medicalTest.category', 'medicalTest.category.subcategories'],
    // });

    console.log('Fetched Staff:', staff);

    const testSelections = await this.testSelectionRepository.find({
      where: { staff: { id: staff.id } },
      relations: ['medicalTest', 'medicalTest.category', 'medicalTest.category.subcategories'],
      });
    console.log('Fetched Test Selections:', testSelections);

  
    const tests = testSelections.map((testSelection) => {
      const subcategoryNames = testSelection.medicalTest.category.subcategories
        ?.map((subcat) => subcat.name)
        .join(', ') || null;
  
      return {
        testName: testSelection.medicalTest.name,
        testPrice: testSelection.medicalTest.price,
        testCategory: testSelection.medicalTest.category.name,
        testSubcategories: subcategoryNames,
      };
    });
  
    const totalPrice = tests.reduce((sum, test) => sum + Number(test.testPrice), 0);
  
    return { tests, totalPrice };
  }

  // async addTestsForStaff(fullName: string, newTestIds: string[]): Promise<{ tests: any[]; totalPrice: number }> {
  //    const staff = await this.staffRepository.findOne({ where: { fullName }});
  //   if (!staff) {
  //     throw new NotFoundException('Staff not found');
  //   }
  
    
  //   // const existingTests = staff.testSelections
  
  //   // Fetch the tests based on the provided IDs
  //   const tests = await this.medicalTestRepository.find({
  //     where: { id: In(newTestIds) },
  //   });
  
  //   // Check for any tests that are already assigned to the staff
  //   const existingTests = await this.testSelectionRepository.find({
  //     where: { staff, medicalTest: In(newTestIds) },
  //   });
  
  //   // Filter out already assigned tests
  //   const testsToAdd = tests.filter((test) => !existingTests.some((existing) => existing.medicalTest.id === test.id));

  //   // if(testsToAdd){
  //   //   throw new Error('Test already assigned to user')
  //   // }
  
  //   // Create new test selections for the staff
  //   const testSelections = testsToAdd.map((test) => {
  //     const testSelection = new TestSelectionEntity();
  //     testSelection.staff = staff;
  //     testSelection.medicalTest = test;
  //     return testSelection;
  //   });
  
  //   // Save new test selections
  //   await this.testSelectionRepository.save(testSelections);
  
  //   // Fetch the updated test selections for the staff
  //   const updatedTestSelections = await this.testSelectionRepository.find({
  //     where: { staff },
  //     relations: ['medicalTest', 'medicalTest.category', 'medicalTest.category.subcategories'],
  //   });
  
  //   const updatedTests = updatedTestSelections.map((testSelection) => {
  //     const subcategoryNames = testSelection.medicalTest.category.subcategories
  //       ?.map((subcat) => subcat.name)
  //       .join(', ') || null;
  
  //     return {
  //       testName: testSelection.medicalTest.name,
  //       testPrice: testSelection.medicalTest.price,
  //       testCategory: testSelection.medicalTest.category.name,
  //       testSubcategories: subcategoryNames,
  //     };
  //   });
  
  //   const totalPrice = updatedTests.reduce((sum, test) => sum + Number(test.testPrice), 0);
  
  //   return { tests: updatedTests, totalPrice };
  // }

  // async addTestsForStaff(fullName:string, newTestIds:string[]):Promise<{tests: any[]; totalPrice: number}> {
  //   const staff = await this.staffRepository.findOne({where: {fullName}, relations: ['testRepository']});

  //   if(!staff){
  //     throw new Error('Staff not found')
  //   }

  //   const existingTests = staff.testSelections.map((tests) =>tests.id)

  //   const duplicateTest = newTestIds.filter((testId) => existingTests.includes(testId));

  //   if (duplicateTest.length > 0){
  //     throw new Error (`Tests already assigned to staff : ${duplicateTest.join(',')}`);
  //   }

  //   const newTests = await this.medicalTestRepository.find(
  //     {where: { id: In(newTestIds)} }
  //   )

  //   if (newTests.length !== newTestIds.length) {
  //     throw new Error('Some tests were not found');
  //   }

  //   staff.testSelections = [...staff.testSelections, ...newTestIds]

  //   return this.testSelectionRepository.save(newTestIds)


  // }

  async removeTestsForStaff(fullName: string, testIdsToRemove: string[]): Promise<{ tests: any[]; totalPrice: number }> {
    const staff = await this.staffRepository.findOne({ where: { fullName } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
  
    if (!Array.isArray(testIdsToRemove)) {
      throw new Error('testIdsToRemove should be an array');
    }
  
    // Find test selections to remove for the staff
    const testsToRemove = await this.testSelectionRepository.find({
      where: { staff, medicalTest: In(testIdsToRemove) },
      relations: ['medicalTest'],
    });
  
    if (testsToRemove.length === 0) {
      throw new Error('No tests found to remove');
    }
  
    // Remove the test selections
    await this.testSelectionRepository.remove(testsToRemove);
  
    // Fetch the updated test selections for the staff
    const updatedTestSelections = await this.testSelectionRepository.find({
      where: { staff },
      relations: ['medicalTest', 'medicalTest.category', 'medicalTest.category.subcategory'],
    });
  
    const updatedTests = updatedTestSelections.map((testSelection) => {
      const subcategoryNames = testSelection.medicalTest.category.subcategories
        ?.map((subcat) => subcat.name)
        .join(', ') || null;
  
      return {
        testName: testSelection.medicalTest.name,
        testPrice: testSelection.medicalTest.price,
        testCategory: testSelection.medicalTest.category.name,
        testSubcategories: subcategoryNames,
      };
    });
  
    const totalPrice = updatedTests.reduce((sum, test) => sum + Number(test.testPrice), 0);
  
    return { tests: updatedTests, totalPrice };
  }
  
  
  
  
  



  
  
}

