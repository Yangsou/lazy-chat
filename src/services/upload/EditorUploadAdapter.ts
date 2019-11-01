export class EditorUploadAdapter {
  public loader: any;
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

// Starts the upload process.
  public upload() {
    // Update the loader's progress.

    // server.onUploadProgress((data) => {
    //   loader.uploadTotal = data.total;
    //   loader.uploaded = data.uploaded;
    // });

    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file
        .then((file) => new Promise(async (resolve, reject) => {
          try {
            const url = '';
            console.log('url', url, file);
            resolve({
              default: url
            });
          } catch (error) {
            reject(error);
          }
        }));
  }

// Aborts the upload process.
  // public abort() {
    // Reject the promise returned from the upload() method.
  //   server.abortUpload();
  // }
}

export function EditorUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      // Configure the URL to the upload script in your back-end here!
    return new EditorUploadAdapter(loader);
  };
}
