import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DbService } from 'src/db/db.service';
import { UserDto } from 'src/user/dto';
import { EventDto } from './dto';

@Injectable()
export class EventService {
    constructor(private db: DbService) {}

    create(dto: EventDto) {
        try {
            const newEvent = this.db.event.create({
                data: {
                    ...dto
                }
            });

            return newEvent;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError ){
                if (error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                }
            }
        }
    }
    
    async findAll(params: {
        userId: string,
        skip?: number,
        take?: number
    }) {
        const { userId, skip, take } = params
        let data; // TODO: add type


        const total = await this.db.event.count({
            where: {
                userId: userId
            }
        });

        if( isNaN(skip) ) {
            data = await this.db.event.findMany({
                where: {
                    userId: userId
                },
                include: {
                    user: true
                },
                take
            });
        }
        else {
            data = await this.db.event.findMany({
                where: {
                    userId: userId
                },
                include: {
                    user: true
                },
                skip,
                take
            });    
        }

        // TODO: remove password, and userId from user data

        const current = Math.ceil((skip * take - 1) / take) + 1;

        return {
            items: data,
            meta: {
                totalItems: total,
                itemCount: data.length,
                itemPerPage: take,
                totalPages: Math.ceil(total / take),
                currentPage: current
            },
            // TODO: complete this section, maybe replace take and skip
            links: {
                first: "http://localhost:3000/users?take=10",
                previous: "",
                next: "",
                last: "http://localhost:3000/users?skip=1&take=10"
            }
        }
    }




    findOne(id: string) {
        return this.db.event.findUnique({ where: {id} });
    }


    async update(id: string, dto: EventDto) {
        //const user = await this.db.event.findUnique({ where: {id} })

        return this.db.user.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        });
    }

    async remove(id: string) {
        await this.db.event.delete({where: {id}});
    }
}
