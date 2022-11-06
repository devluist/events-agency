import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private db: DbService) {}

    findAll() {
        return this.db.user.findMany();
    }

    findOne(id: string) {
        return this.db.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: string, dto: UserDto) {
        
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
        await this.db.user.delete({where: {id}});
    }
}
