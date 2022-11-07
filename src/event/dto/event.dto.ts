import { IsString, IsNotEmpty, IsDateString  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class EventDto {

    @ApiProperty({
        example: "JsConf Caracas"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "Altamira, Caracas, Venezuela"
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: "Datetime string with ISO8601 YYYY-MM-DD HH:MM:SSZ",
        example: "2022-07-15 15:00:00.000"
    })
    @IsNotEmpty()
    @IsDateString()
    datetime: Date;

    userId: string;
}
