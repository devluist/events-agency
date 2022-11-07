import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({
        summary: "This will use JWT to log a user in. The response contains an access token to use on header (Bearer $access_token)"
    })
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }
}
