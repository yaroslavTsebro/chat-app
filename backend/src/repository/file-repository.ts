import logger from '../utility/logger';
import { File, IFile } from '../entity/db/model/file';
import { CreateFileDto } from '../entity/dto/file/create-file-dto';
import { ClientSession } from 'mongoose';

class FileRepository {
  async create(dto: CreateFileDto, session: ClientSession): Promise<IFile> {
    try {
      const file = new File({
        originalName: dto.originalName,
        format: dto.format,
        size: dto.size,
      });
      return file.save({ session });
    } catch (e) {
      logger.error('An error occurred in repository');
      throw e;
    }
  }
}
export default new FileRepository();
