import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {

    const request = context
      .switchToHttp()
      .getRequest();

    console.log('================================');
    console.log('REQUEST:', request.method, request.originalUrl);
    console.log('AUTH HEADER:', request.headers.authorization);
    console.log('================================');

    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ) {

    const request = context
      .switchToHttp()
      .getRequest();

    if (err) {
      console.log('JWT ERROR:', err);
    }

    if (info) {
      console.log('JWT INFO:', info.message || info);
    }

    console.log('JWT USER:', user);

    if (err || !user) {
      console.log(
        `❌ Unauthorized -> ${request.method} ${request.originalUrl}`,
      );

      throw err || new UnauthorizedException('Unauthorized');
    }

    console.log(
      `✅ Authorized -> ${request.method} ${request.originalUrl}`,
    );

    return user;
  }
}