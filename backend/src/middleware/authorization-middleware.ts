import { NextFunction, Request, Response } from 'express';
import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import Jwt from '../utility/jwt';
import { JwtPayload } from 'jsonwebtoken';
import logger from '../utility/logger';

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(
        new AppError(ErrorCodes.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED)
      );
    }
    const accessToken: string | undefined = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(
        new AppError(ErrorCodes.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED)
      );
    }

    const userData = Jwt.validateAccessToken(accessToken);
    if (!userData) {
      return next(
        new AppError(ErrorCodes.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED)
      );
    }
    req.user = userData as JwtPayload;

    logger.info('Authorization went good');
    next();
  } catch (e) {
    return next(
      new AppError(ErrorCodes.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED)
    );
  }
}
