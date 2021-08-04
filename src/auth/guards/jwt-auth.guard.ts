import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // to get the metadata
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
// inhering since jwt strategic
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get metadata value
    const checkPlubicRequest = this.reflector.get(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (checkPlubicRequest) return true;
    return super.canActivate(context);
  }
}
