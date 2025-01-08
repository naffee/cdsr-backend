import { Auth, Column,Entity, ManyToMany } from "typeorm";
import { CustomEntity } from "./custom.entity";
import { AuthEntity } from "./auth.entity";
import { StaffEntity } from "./staff.entity";

@Entity('Roles')
export class RolesEntity extends CustomEntity{
    @Column({name: 'roles'})
    name: string;

    @ManyToMany(() => AuthEntity, (user) => user.roles)
    users:AuthEntity[]

    @ManyToMany(() => StaffEntity, (employee) => employee.roles)
    employee:StaffEntity[]
}



