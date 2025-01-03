// src/database/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BackgroundCheckTypeEntity } from '../entities/background_check_type.entity';
// import { MedicalCategory } from '../entities/medicai-category.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MedicalTestEntity } from '../entities/medical.entity';

@Injectable()
export class SeederService {
  constructor(
    // @InjectRepository(MedicalCategory)
    // private readonly categoryRepository: Repository<MedicalCategory>,
    // @InjectRepository(MedicalTestEntity)
    // private readonly testRepository: Repository<MedicalTestEntity>,
    private readonly dataSource: DataSource) {}

  async seedBackgroundCheckTypes() {
    const checkTypes = [
      { name: 'Employment History' },
      { name: 'Medical History' },
      { name: 'Education History' },
      { name: 'Criminal History' },
      { name: 'Sexual Criminal History' },
      { name: 'Financial History' },
      { name: 'Prison/Jail History' },
    ];

    const checkTypeRepository = this.dataSource.getRepository(BackgroundCheckTypeEntity);
    await checkTypeRepository.save(checkTypes);
    console.log('Background Check Types seeded successfully!');
  }


  // async seedCategories() {
  //   // Manually defined categories and subcategories
  //   const categories = [
  //     {
  //       name: 'PACKAGE',
  //       description: 'Tests related to package',
  //       subcategories:[],
  //       tests: [
  //         {name: 'STI PROFILE'},{name: 'FULL BLOOD COUNT'},{name:'NANNY/DOMESTIC STAFF SCREENING'},{name:'COMPREHENSIVE MALE'}, 
  //           {name:'COMPREHENSIVE FEMALE'}, 
  //           {name:'FOODHANDLERS SCREENING'},
  //           {name:'PRE EMPLOYMENT SCREENING'},
  //           {name:'PRE MARITAL SCREENING'},
  //           {name:'FERTILITY SCREENING'},
  //           {name:'HORMONAL PROFILE'},
  //       ]
  //     },
  //     {
  //       name: 'CLINICAL CHEMISTRY',
  //       description: 'clinical chemistry tests',
  //       subcategories: [
  //         {
  //           name: 'GLUCOSE',
  //             test: {name:'(FLU) GLUCOSE (RANDOM/FASTING)'},
  //             test: {name:'(EDTA) HbA1c'},
  //             test: {name:'(FLU) 2HPP'},
  //             test: {name:'(FLU) OGTT-75g STANDARD'}
  //         },

  //         {
  //           name: 'LIVER FUNCTION',
  //             test: {name:'(SST) LIVER FUNCTION TEST'},
  //             test: {name:'(SST) ALT'},
  //             test: {name:'(SST) AST'},
  //             test: {name:'(SST) ALP'},
  //             test: {name:'(SST) TOTAL BILIRUBIN'},
  //             test: {name:'(SST) DIRECT BILIRUBIN'},
  //             test: {name:'(SST) TOTAL PROTEIN'},
  //             test: {name:'(SST) ALBUMIN'},
  //             test: {name:'(SST) GLOBULIN'},
  //         },

  //         {
  //           name: 'LIPID PROFILE',
  //             test: {name:'(SST) LIPID PROFILE'}, 
  //             test: {name:'(SST) CHOLESTEROL, HDL '},
  //             test: {name:'(SST) CHOLESTEROL, LDL'},
  //             test: {name:'(SST) CHOLESTEROL, TOTAL'},
  //             test: {name:'(SST) TRIGLYCERIDES'},
  //         },

  //         {
  //           name: 'KIDNEY',
  //             test: {name:'(SST) ELECTROLYTE, UREA, CREATININE'},
  //             test: {name:'(SST) ELECTROLYTE'},
  //             test: {name:'(SST) UREA'},
  //             test: {name:'(SST) CREATININE'},
  //             test: {name:'(SST) URIC ACID'},
  //             test: {name:'(UNV) CREATININE CLEARANCE.24HRS'},
  //             test: {name:'(UNV) URINARY PROTEIN, 24HRS'},
  //         },



        

  //   ]
  //     {
  //       name: 'Urine Tests',
  //       description: 'Tests conducted on urine samples',
  //       subcategories: [],  // No subcategories for this one
  //     },
  //   ];

  //   // Loop through the categories and add them to the database
  //   for (const categoryData of categories) {
  //     // Create the category
  //     const category = this.categoryRepository.create({
  //       name: categoryData.name,
  //       description: categoryData.description,
  //     });

  //     // Save the category first
  //     const savedCategory = await this.categoryRepository.save(category);

  //     // If there are subcategories, create them and assign to the parent category
  //     for (const subcategoryData of categoryData.subcategories) {
  //       const subcategory = this.categoryRepository.create({
  //         name: subcategoryData.name,
  //         description: subcategoryData.description,
  //         parentCategory: savedCategory,
  //       });

  //       // Save the subcategory
  //       await this.categoryRepository.save(subcategory);
  //     }
  //   }
  // }
}
