import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { ApiAcceptedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get('profile')
    @ApiAcceptedResponse({
        description: "Fetch data associated with logged user"
    })
    @ApiForbiddenResponse({
        description: "You must login first"
    })
    userProfile(@GetUser() user: UserDto) {
        return user;
    }

    @Get()
    fetchAllUsers()  {
        return this.userService.findAll();
    }

    @Get(':id')
    fetchUser(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, dto: UserDto) {
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
