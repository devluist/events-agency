import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { DbService } from "src/db/db.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { ConfigService } from "@nestjs/config";



@Injectable({})
export class AuthService {
    constructor(
        private db: DbService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async register(dto: AuthDto) {
        try {
            const pass = await argon.hash(dto.password);
            const user = await this.db.user.create({
                data: {
                    email: dto.email,
                    password: pass
                }
            })

            return this.signToken(user.id, user.email);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError ){
                if (error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                }
            }
        }
    }

    async login(dto: AuthDto) {

        const user = await this.db.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user){
            throw new ForbiddenException('Credentials incorrect');
        }

        const pwMatches = await argon.verify(user.password, dto.password);

        if(!pwMatches){
            throw new ForbiddenException('Credentials incorrect');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: string, email: string): Promise<{access_token: string}> {
        const payload = {
            sub: userId, // subfield identifier for the token
            email
        }

        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token
        }
    }
}
