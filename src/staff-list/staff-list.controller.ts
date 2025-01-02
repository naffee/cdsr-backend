import { Controller,Get,Post,Delete,Param,UseGuards,Body} from '@nestjs/common';
import { StaffListService } from './staff-list.service';
import { ApiBearerAuth,ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/helper/guards/roles.guard';
import { Roles } from 'src/helper/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/helper/guards/jwt-auth.guard';
import { CreateStaffDto, } from './staff-list.dto';
import { UsePipes,ValidationPipe } from '@nestjs/common';

@Controller('staff-list')
export class StaffListController {
    constructor (private readonly staffListService: StaffListService ) {}

    @ApiTags('Staff')
    @Post('create-staff')
    @UsePipes(new ValidationPipe({ transform: true }))
    createStaff(@Body() dto: CreateStaffDto){
        return this.staffListService.createStaff(dto)
    }


    @ApiTags('Staff')
    @Get('get-staff')
    getAllDriver(){
        return this.staffListService.getAllStaff()
    }


    @ApiTags('Staff')
    @Get('get-staff/:id')
    getOneDriver(@Param('id') id: string){
        return this.staffListService.getOneStaff(id)
    }

}

