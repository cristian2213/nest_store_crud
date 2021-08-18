import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Origins } from '../origins/access.origin';

@Injectable()
export class AccessMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origins = Object.values(Origins);
    const route = req.url ? parseInt(req.url.split('/')[1]) : null;
    // validation by pattern
    const matchPath =
      req.originalUrl.split('/').length === 3 && !isNaN(route) ? true : null;

    if (
      (origins.includes(req.header('Origin')) && matchPath) ||
      req.header('Origin') === undefined
    )
      next();
    else {
      if (!origins.includes(req.header('Origin')) && matchPath)
        res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: `The hostname ${req.header('Origin')} is unauthorized`,
        });
      else if (origins.includes(req.header('Origin')) && !matchPath) next();
      else next();
    }
  }
}
