import { IsString, IsNotEmpty  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {

    @ApiProperty({
        example: "email@domain.com"
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "123456"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
