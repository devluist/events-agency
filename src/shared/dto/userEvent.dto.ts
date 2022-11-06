import { IsString, IsNotEmpty  } from 'class-validator';

export class UserEventDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    eventId: string;
}
