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
  ) {}

  async assignTestsToStaff(staffName: string, testIds: string[]): Promise<StaffEntity> {
    const staff = await this.staffRepository.findOne({ where: { id: staffName}, relations: ['medicalTests'] });
    if (!staff) {
      throw new Error('Staff not found');
    }

    const tests = await this.medicalTestRepository.find({
        where: { id: In(testIds) },
      });
      
      if (!tests.length) {
        throw new Error('No valid tests found');
      }
      

    staff.medicalTests = [...staff.medicalTests, ...tests]; // Add the tests to the staff's list
    return await this.staffRepository.save(staff);
  }

  // medical-test.service.ts
  async getTestsForStaff(staffname: string): Promise<MedicalTestEntity[]> {
    const staff = await this.staffRepository.findOne({
      where: { fullName: staffname },
      relations: ['medicalTests'],
    });
    if (!staff) {
      throw new Error('Staff not found');
    }
    return staff.medicalTests;
  }

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
  
  async test(){const category = this.categoryRepository.create({ name: "Liver" });
    const savedCategory = await this.categoryRepository.save(category);
    console.log(savedCategory);}





  
  
}

