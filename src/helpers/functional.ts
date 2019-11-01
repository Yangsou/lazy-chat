export function confirm(self, { id, actionType, onSuccess }) {
  self.$msgbox({
    title: self.$t('delete_confirm').toString(),
    message: self.$t('delete_confirm_message').toString(),
    showCancelButton: true,
    confirmButtonText: self.$t('confirm').toString(),
    cancelButtonText: self.$t('cancel').toString(),
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = 'Loading...';
        self.$store.dispatch(actionType, {
          id,
          onSuccess: () => {
            instance.confirmButtonLoading = false;
            done();
            onSuccess();
          },
          onFailure: () => {
            done();
            instance.confirmButtonText = self.$t('confirm').toString();
            instance.confirmButtonLoading = false;
          }
        });
      } else {
        done();
      }

      return;
    }
  }).then(() => {
    self.$message({
      type: 'info',
      message: this.$t('delete_successfully').toString()
    });
  }).catch(() => {
    // no handle
  });
}

export function confirmAction(self, {title, message, handleFunction}) {
  self.$confirm(
    message,
    title,
    {
      confirmButtonText: self.$t('confirm').toString(),
      cancelButtonText: 'Cancel',
      type: 'info'
    })
    .then(() => {
      handleFunction();
    })
    .catch(() => {
      //
    });
}

export function GetVoices(): any {
  const name: string = 'Google UK English Female';
  const _filter = (voices: any[]) => {
    return voices.find((e) => e.name === name);
  };
  const speechSynthesis = window.speechSynthesis;

  return new Promise((resolve, reject) => {
    let voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      return resolve(_filter(voices));
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      voices.forEach((element) => {
        if (element.name === name) {
          return resolve(element);
        }
      });

      reject(false);
    };
  });
}

export function textToSpeech(text: string) {
  console.log('msg', text);
  if ('speechSynthesis' in window) {
    return new Promise(async (resolve, reject) => {
      const msg = new SpeechSynthesisUtterance();
      msg.text = text.replace('-', 'negative');
      const _voice = await GetVoices();

      if (_voice) {
        msg.voice = _voice;
      }

      speechSynthesis.speak(msg);

      msg.onend = () => {
        resolve(true);
      };
      msg.onerror = (err) => {
        reject(err);
      };
    });
  }
  console.log('Browser is not support this feature!');
}

export function getStar(point: number, stars: number[]): number {
  for (let i = stars.length; i--; i >= 0) {
    if (point >= stars[i]) {
      return stars.indexOf(stars[i]) + 1;
    }
  }

  return 0;
}

export function generateUnitKey(s = '') {
  return `_${s}${Math.random().toString(36).substr(2, 9)}`;
}
