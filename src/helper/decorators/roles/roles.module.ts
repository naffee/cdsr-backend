import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/database/entities/roles.entity';
import { RolesService } from './roles.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
        RolesEntity
    ]),
    
  ],
  
  providers: [RolesService],
  controllers: []
})
export class RolesModule {}
