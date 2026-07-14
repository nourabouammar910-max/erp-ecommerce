import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';



interface JwtPayload {

  sub: number;

  email: string;

  role: string;

}



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


  constructor(
    private readonly config: ConfigService,
  ) {


    super({

      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),


      secretOrKey:
        config.getOrThrow<string>(
          'JWT_SECRET',
        ),


      ignoreExpiration:false,

    });


  }



  async validate(
    payload: JwtPayload,
  ) {


    return {

      userId: payload.sub,

      email: payload.email,

      role: payload.role,

    };


  }


}