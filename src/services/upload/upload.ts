// import Amplify from 'aws-amplify';
import { Logger as log } from '../logger';

export interface IOptionResizeImage {
  maxWidth: number;
  maxHeight: number;
  quality?: number;
}

export async function resizeImage(file: File, opts: IOptionResizeImage | IOptionResizeImage[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    let oneFile = false;

    if (!Array.isArray(opts)) {
      opts = [opts];
      oneFile = true;
    }
    const confs: IOptionResizeImage[] = opts;

    reader.readAsDataURL(file);
    reader.onload = (e: any) => {

      const fileHandle = e.target.result;
      // Handle get information image
      const imgBase = document.createElement('img');
      imgBase.src = fileHandle;
      const canvasBase = document.createElement('canvas');
      const initialCtxBase = canvasBase.getContext('2d');
      initialCtxBase.drawImage(imgBase, 0, 0);
      const widthBase = imgBase.width;
      const heightBase = imgBase.height;

      if (widthBase === 0 && heightBase === 0) {
        return resizeImage(file, opts).then((result) => {
          if (oneFile) {
            return resolve(result[0]);
          }

          return resolve(result);
        });
      }

      const resize = (MAX_WIDTH, MAX_HEIGHT, quality = 0.1) => {

        return new Promise((resolveT) => {
          const img = document.createElement('img');
          img.src = fileHandle;
          const canvas = document.createElement('canvas');
          const initialCtx = canvas.getContext('2d');
          initialCtx.drawImage(img, 0, 0);
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          return canvas.toBlob((imageBlob: any) => {
            imageBlob.name = `${width}x${height}.jpeg`;
            imageBlob.metadata = {
              width,
              height
            };

            return resolveT(imageBlob);
          }, 'image/jpeg', quality);
        });

      };

      return Promise.all(confs.map((a) => {
        return resize(a.maxWidth, a.maxHeight, a.quality);
      })).then((result) => {
        if (oneFile) {
          return resolve(result[0]);
        }

        return resolve(result);
        // return resolve(result);
      });

    };
    reader.onerror = (error) => {
      log.debug('Error is resizing image', error);

      return reject(error);
    };
  });

}
