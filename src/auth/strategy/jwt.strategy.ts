import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'src/db/db.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        // there is no point to use private in "config", since is only used for super
        config: ConfigService,
        private db: DbService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {sub: string, email: string}) {
        const user = await this.db.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        // TODO: this can be improved with more time, this is to avoid leaking sensitive data
        delete user.password;

        return user;
    }
}