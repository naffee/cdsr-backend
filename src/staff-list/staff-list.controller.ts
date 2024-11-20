import { Controller,Get,Post,Delete,Param,UseGuards,Body} from '@nestjs/common';
import { StaffListService } from './staff-list.service';
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/helper/guards/roles.guard';
import { Roles } from 'src/helper/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/helper/guards/jwt-auth.guard';
import { CreateDriverDto,CreateDomesticStaffDto,CreateSecuirityGuardDto } from './staff-list.dto';

@Controller('staff-list')
export class StaffListController {
    constructor (private readonly staffListService: StaffListService ) {}

    @ApiTags('Driver')
    @Post('create-driver')
    createDriver(@Body() dto: CreateDriverDto){
        return this.staffListService.createDriver(dto)
    }

    @ApiTags('SecurityGuard')
    @Post('create-securityGuard')
    createSecurityGuard(@Body() dto: CreateSecuirityGuardDto){
        return this.staffListService.createSecuirityGuard(dto)
    }

    @ApiTags('')
    @Post('create-driver')
    createDomesticStaff(@Body() dto: CreateDomesticStaffDto){
        return this.staffListService.createDomescticStaff(dto)
    }

    @ApiTags('Driver')
    @Get('get-driver')
    getAllDriver(){
        return this.staffListService.getAllDrivers()
    }

    @ApiTags('Security-Guard')
    @Get('get-security-guard')
    getAllSecurityGuards(){
        return this.staffListService.getAllSecurityGuards()
    }

    @ApiTags('Domestic-Staff')
    @Get('get-domestic-staff')
    getAllDomesticStaffs(){
        return this.staffListService.getAllDomesticStaffs()
    }

    @ApiTags('Driver')
    @Get('get-driver/:id')
    getOneDriver(@Param('id') id: string){
        return this.staffListService.getOneDriver(id)
    }

    @ApiTags('Security-Guard')
    @Get('get-security-guard/:id')
    getOneSecurirtyGuard(@Param('id') id: string){
        return this.staffListService.getOneSecuirityGuard(id)
    }

    @ApiTags('Domestic-Staff')
    @Get('get-domestic-staff/id')
    getOneDomesticStaff(@Param('id') id: string){
        return this.staffListService.getOneDriver(id)
    }
}

