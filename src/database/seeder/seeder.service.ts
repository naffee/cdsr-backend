// src/database/seeder/seeder.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BackgroundCheckTypeEntity } from '../entities/background_check_type.entity';

@Injectable()
export class SeederService {
  constructor(private readonly dataSource: DataSource) {}

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
}
