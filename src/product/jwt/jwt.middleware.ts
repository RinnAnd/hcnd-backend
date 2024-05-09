import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      throw new UnauthorizedException('JWT token is missing');
    }

    try {
      const secret = process.env.SECRET_KEY;
      jwt.verify(token, secret);
      next();
    } catch (err) {
      throw new UnauthorizedException('JWT token is invalid or expired');
    }
  }
}
