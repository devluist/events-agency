import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EventService } from './event.service';
import { User } from '@prisma/client';
import { EventDto } from './dto';

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {

    constructor(private eventService: EventService) {}
    
    @Post()
    registerEvent(@Body() dto: EventDto, @GetUser() user: User) {
        dto.userId = user.id
        return this.eventService.create(dto);
    }

    @Get()
    fetchUserEvents(
        @GetUser() user: User,
        @Query('skip') skip: string = '0',
        @Query('take') take: string = '10'
    ) {
        const data = {
            userId: user.id,
            skip: Number(skip),
            take: Number(take)
        }
        return this.eventService.findAll({...data});
    }





    @Get(':id')
    fetchEvent(@Param('id') id: string) {
        return this.eventService.findOne(id);
    }


    @Put(':id')
    updateEvent(@Param('id') id: string, dto: EventDto) {
        return this.eventService.update(id, dto);
    }

    @Delete(':id')
    deleteEvent(@Param('id') id: string) {
        return this.eventService.remove(id);
    }
}
