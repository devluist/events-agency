import { IsString, IsNotEmpty, IsEmail  } from 'class-validator';

export class UserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
