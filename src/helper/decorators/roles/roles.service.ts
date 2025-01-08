import { Repository } from "typeorm";
import { RolesEntity } from "src/database/entities/roles.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolesService{
    constructor(
        @InjectRepository(RolesEntity)
        private readonly roleRepository: Repository<RolesEntity>,
    ){}

    async seedRoles() {
        const roles = ['Employer', 'Employer', 'Government Body', 'Medical Sector'];
        
        for (const name of roles){
            const roleExists = await this.roleRepository.findOne({where: {name}});

            if (!roleExists) {
                const role = this.roleRepository.create({name});
                this.roleRepository.save(role)
            }

        }    
        
    }
}