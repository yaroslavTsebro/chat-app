import { UploadedFile } from 'express-fileupload';
import logger from '../utility/logger';
import { ClientSession } from 'mongoose';
import { CreateFileDto } from '../entity/dto/file/create-file-dto';
import fileRepository from '../repository/file-repository';
import { IFile } from '../entity/db/model/file';
import path from 'path';

class FileService {
  async create(img: UploadedFile, session: ClientSession): Promise<IFile> {
    try {
      const fileDto = new CreateFileDto();
      fileDto.size = img.size;
      fileDto.originalName = img.name;
      fileDto.format = img.name.split('.')[-1];

      const createdFile = await fileRepository.create(fileDto, session);

      let filePath;
      if (process.env.FILE_PATH) {
        filePath = process.env.FILE_PATH;
      } else {
        filePath = '../../data/files';
      }
      img.mv(path.resolve(__dirname, filePath, createdFile._id.toString()));

      return createdFile;
    } catch (e) {
      logger.error('Error occurred in file service');
      throw e;
    }
  }

  async createMany(
    files: UploadedFile[],
    session: ClientSession
  ): Promise<IFile[]> {
    try {
      const createdFiles: IFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileDto = new CreateFileDto();
        fileDto.size = file.size;
        fileDto.originalName = file.name;
        fileDto.format = file.name.split('.')[-1];

        const createdFile = await fileRepository.create(fileDto, session);

        let filePath;
        if (process.env.FILE_PATH) {
          filePath = process.env.FILE_PATH;
        } else {
          filePath = '../../data/files';
        }
        file.mv(path.resolve(__dirname, filePath, createdFile._id.toString()));

        createdFiles.push( createdFile);
      }
      return createdFiles;
    } catch (e) {
      logger.error('Error occurred in file service');
      throw e;
    }
  }
}

export default new FileService();
