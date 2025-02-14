import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


interface JwtPayload {
  sub: string; 
  username: string;
  role: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
