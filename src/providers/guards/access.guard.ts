import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Origins } from '../origins/access.origin';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const allowList = Object.values(Origins);
    const origin = request.header('Origin');
    if (allowList.includes(origin) || origin === undefined) return true;
    throw new UnauthorizedException(`The hostname ${origin} is unauthorized`);
  }
}
