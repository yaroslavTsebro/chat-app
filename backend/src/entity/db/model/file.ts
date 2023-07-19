import { model, ObjectId, Schema } from 'mongoose';

export interface IFile {
  _id: ObjectId;
  originalName: string;
  format: string;
  size: string;
  type: string;
}

const fileSchema = new Schema<IFile>(
  {
    format: { type: String, required: true },
    originalName: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const File = model<IFile>('File', fileSchema);
