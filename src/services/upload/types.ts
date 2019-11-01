export enum pathUpload {
  AVATAR_USER = 'users/avatars/',
  AVATAR_DEPARTMENT = 'departments/avatars',
  MESSAGE_FILE = 'messages/files',
  AVATAR_PROJECT = 'projects/avatars/',
  PROJECT_FILE = 'projects/files',
  FEEDBACK = 'feedbacks/files'
}

export const sizeImage = {
  avatar: {
    thumbnail: {
      maxWidth: 128,
      maxHeight: 128
    },
    original: {
      maxWidth: 1024,
      maxHeight: 1024
    }
  },
  message: {
    thumbnail: {
      maxWidth: 320,
      maxHeight: 240
    },
    original: {
      maxWidth: 1920,
      maxHeight: 1920
    }
  },
  projects: {
    thumbnail: {
      maxHeight: 80,
      maxWidth: 80
    },
    original: {
      maxHeight: 1024,
      maxWidth: 1024
    }
  }
};
