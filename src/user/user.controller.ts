import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get('profile')
    userProfile(@GetUser() user: User) {
        return user;
    }

    @Get()
    fetchAllUsers() {
        // TODO: pagination
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
