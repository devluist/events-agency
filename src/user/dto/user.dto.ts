import { IsString, IsNotEmpty, IsEmail, IsUUID  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiProperty({
        example: "31ae29a9-302f-45a6-9867-188874d93594"
    })
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty({
        example: "Altamira, Caracas, Venezuela"
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "2022-11-05T15:40:05.000Z"
    })
    @IsNotEmpty()
    createdAt: string;
}
