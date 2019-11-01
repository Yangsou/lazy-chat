// import { StatusCode } from './Common';

export enum FileType {
  Photo = 'photo',
  Video = 'video',
  File = 'file'
}

export interface IFile {
  fileName: string;
  extension: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl: string;
  description: string;
  // directoryId: number;
  fileType: FileType;
}

export interface IFileDirectory {
  id: number;
  name: string;
  thumbnailUrl: string;
}
