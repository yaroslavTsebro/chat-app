import { AppError } from '../entity/error/app-error';
import { ErrorCodes } from '../constant/error-codes';
import { ErrorMessages } from '../constant/error-messages';
import logger from '../utility/logger';
import { validateSync } from 'class-validator';
import { UploadedFile } from 'express-fileupload';
import groupRepository from '../repository/group-repository';
import { IGroup } from '../entity/db/model/group';

export class ServiceHelper {
  public static validateDto<T extends object>(dto: T): void {
    const errors = validateSync(dto, { enableDebugMessages: false });
    if (errors.length > 0) {
      throw new AppError(
        ErrorCodes.VALIDATION_ERROR,
        ErrorMessages.VALIDATION_ERROR,
        errors.map((e) => {
          if (e.constraints) {
            return e.constraints;
          }
        })
      );
    }
    logger.info('Validated successfully');
  }

  public static validateId(id: string): void {
    if (id.length < 12) {
      throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST, []);
    }
    logger.info('Validated successfully');
  }

  public static validateIds(ids: string[]): void {
    ids.map((id) => this.validateId(id));
  }

  public static checkFilesForPresence(img: UploadedFile | undefined): void {
    if (img == undefined) {
      throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
    }
  }

  public static checkFiles(img: UploadedFile[] | undefined): void {
    if (img == undefined) {
      throw new AppError(ErrorCodes.BAD_REQUEST, ErrorMessages.BAD_REQUEST);
    }
  }

  public static async checkUserForGroupOwner(
    groupId: string,
    userId: string
  ): Promise<IGroup> {
    const group = await groupRepository.getGroupByIdAndOwnerId(userId, groupId);
    if (!group) {
      throw new AppError(ErrorCodes.FORBIDDEN, ErrorMessages.FORBIDDEN);
    }
    return group
  }
}
