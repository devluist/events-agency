import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { EventService } from './event.service';
import { User } from '@prisma/client';
import { EventDto } from './dto';
import { ApiBearerAuth, ApiPropertyOptional, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('Event')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('events')
export class EventController {

    constructor(private eventService: EventService) {}
    
    @Post()
    registerEvent(@Body() dto: EventDto, @GetUser() user: User) {
        dto.userId = user.id
        return this.eventService.create(dto);
    }

    @Get()
    @ApiQuery({
        name: "skip", required: false, type: Number
    })
    @ApiQuery({
        name: "take", required: false, type: Number
    })
    fetchUserEvents(
        @GetUser() user: User,
        @Query('skip') skip: string = '0', // default pagination values "page" 0
        @Query('take') take: string = '10' // defauult pagination values "limit" 10 per page
    ) {
        /* "skip" and "take" are values from Prisma pagination syntax. For this simple example, it was not extended forward this default behavior */
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
