import { NextFunction, Request, Response } from 'express';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import logger from '../utility/logger';
import { AppError } from '../entity/error/app-error';

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info('Error in error handler: ', err);
  if (err instanceof AppError) {
    const httpStatus = Number(err.code.toString().slice(0, 3));
    return res
      .status(httpStatus)
      .json({
        code: err.code,
        message: err.message,
        errorStack: err.errorStack,
      })
      .end();
  }
  return res.status(500).json({
    code: ErrorCodes.SERVER_ERROR,
    message: ErrorMessages.SERVER_ERROR,
    errorStack: [],
  });
}
