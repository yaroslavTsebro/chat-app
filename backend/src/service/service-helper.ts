import {AppError} from "../entity/error/app-error";
import {ErrorCodes} from "../constant/error-codes";
import {ErrorMessages} from "../constant/error-messages";
import logger from "../utility/logger";
import {validateSync} from "class-validator";

export class ServiceHelper {
  public static validateDto<T extends object>(dto: T): void {
    const errors = validateSync(dto, {enableDebugMessages: false});
    if (errors.length > 0) {
      throw new AppError(
          ErrorCodes.VALIDATION_ERROR,
          ErrorMessages.VALIDATION_ERROR, errors.map(e => {
            if (e.constraints) {
              return e.constraints;
            }
          }))
    }
    logger.info("Validated successfully");
  }

  public static validateId(id: string): void {
    if (id.length < 12) {
      throw new AppError(
          ErrorCodes.BAD_REQUEST,
          ErrorMessages.BAD_REQUEST,
          []);
    }
    logger.info("Validated successfully")
  }

  public static validateIds(ids: string[]): void {
    ids.map(id => this.validateId(id));
  }
}
