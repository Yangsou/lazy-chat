import { FileType, IFile } from 'root/models';
// import { pathUpload, resizeImage, sizeImage } from 'root/services';
// import { getFirebaseApp } from 'root/services/firebase';

export function parseFileType(extension: string): FileType {
  let type = extension.replace(/\/.*/g, '');
  if (type === 'image') { type = 'photo'; }
  switch (type) {
  case FileType.Photo:
  case FileType.Video:
    break;
  default:
    type = 'file';
    break;
  }

  return <any> type;
}

export function checkFileTypeVideo(file: IFile) {
  return file.fileType === FileType.Video;
}

export function checkFileTypeImage(file: any) {
  if (file.raw) {
    return parseFileType(file.raw.type) === FileType.Photo;
  }

  return file.fileType === FileType.Photo;
}

export function getFileExtension(filename) {
  const ext = /^.+\.([^.]+)$/.exec(filename);

  return ext === null ? '' : ext[1];
}

export const listFileIcon = [
  'png', 'jpg', 'jpeg', 'gif',
  'doc', 'docx',
  'xls', 'xlsx',
  'ppt', 'pdf', 'pptx',
  'CAD', 'pages', 'numbers',
  'key', 'zip', 'rar', 'mp4'
];

export enum iconFileName {
  pdf = 'file-pdf',
  doc = 'file-word',
  docx = 'file-word',
  xls = 'file-excel',
  xlsx = 'file-excel',
  ppt = 'file-powerpoint',
  pptx = 'file-powerpoint',
  zip = 'file-archive',
  rar = 'file-archive'
}

export function parseIconFileWithType(file: any) {
  const basePath = '/assets/img/';
  let iconFile;
  const _fileType: FileType = file.raw ? parseFileType(file.raw.type) : file.fileType;
  const fileName = file.name || file.fileName;
  switch (_fileType) {
  case FileType.Photo:
    iconFile = 'file-image';
    break;
  case FileType.File:
    iconFile = listFileIcon.indexOf(getFileExtension(fileName)) >= 0 && iconFileName[getFileExtension(fileName)]
        ? iconFileName[getFileExtension(fileName)] : 'file';
    break;
  default:
    iconFile = 'file';
    break;
  }

  return `${basePath}${iconFile}.svg`;
}

// export async function uploadFileForMessage(file, pathUploadCurrent: pathUpload) {
//   let thumbnail: any = '';
//   let original: any;

//   const storageRef = getFirebaseApp().storage().ref();

//   if (checkFileTypeImage(file)) {
//     const [fileThumbnail, fileOriginal] = await resizeImage(
//       file.raw,
//       [sizeImage.message.thumbnail, sizeImage.message.original]
//     );
//     const currentRefThumbnail = storageRef.child(pathUploadCurrent + fileThumbnail.name);
//     thumbnail = currentRefThumbnail.put(fileThumbnail);
//     const currentRefOriginal = storageRef.child(pathUploadCurrent + fileOriginal.name);
//     original = currentRefOriginal.put(fileOriginal);
//   } else {
//     const currentRef = storageRef.child(pathUploadCurrent + file.raw.name);
//     original = currentRef.put(file.raw);
//   }

//   return { thumbnail, original };

// }
