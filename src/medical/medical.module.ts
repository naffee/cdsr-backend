import { Module } from '@nestjs/common';
import { MedicalTestController } from './medical.controller';
import { MedicalTestService } from './medical.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/entities/staff.entity';
import { MedicalCategory } from 'src/database/entities/medicai-category.entity';
import { MedicalSubCategoryEntity } from 'src/database/entities/medical-subcategory.entity';
import { MedicalTestEntity } from 'src/database/entities/medical.entity';
import { TestSelectionEntity } from 'src/database/entities/test-selection.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      MedicalCategory,
      MedicalSubCategoryEntity,
      MedicalTestEntity,
      StaffEntity,
      TestSelectionEntity
      
    ])

  ],
  providers: [MedicalTestService],
  controllers: [MedicalTestController]
})
export class MedicalModule {}

