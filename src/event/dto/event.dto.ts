import { IsString, IsNotEmpty, IsDateString  } from 'class-validator';

export class EventDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsDateString()
    datetime: Date;

    userId: string;
}
