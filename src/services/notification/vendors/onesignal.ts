import { Notification } from 'element-ui';
import { Dispatch } from 'vuex';

// import { IProfile } from 'root/models';
import { Logger as log } from 'root/services';
const OneSignal = window['OneSignal'] || [];

export interface IOptionNotification {
  user?: any;
  dispatch?: Dispatch;
  onReceiveNotification?: (data: IDataNotification) => void;
  onClickNotification?: (data: IDataNotification) => void;
}

export const KeyUserIDForOneSignal = 'UserIdForOneSignal';

export function initNotification(appId: string, options?: IOptionNotification) {

  try {
    console.log('Initial onesignal with appId: ' + appId);
    OneSignal.push(() => {
      OneSignal.init({ appId });
    });

    OneSignal.push(() => {
      OneSignal.isPushNotificationsEnabled().then((enabled) => {
        console.log('Notification enabled init: ' + enabled);
      });
    });

    OneSignal.push(() => {
      OneSignal.registerForPushNotifications();
    });

    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('The user\'s subscription state is now:', isSubscribed);
        if (isSubscribed) {
          OneSignal.getUserId().then((userId) => {
            if (userId) {
              handelUserForSubscribed();
            }

            return;
          });
        }

        return;
      });

    });

    OneSignal.push(() => {
      OneSignal.on('notificationPermissionChange', (permissionChange) => {
        const currentPermission = permissionChange.to;
        console.log('New permission state:', currentPermission);
      });
    });

    OneSignal.push(() => {
      OneSignal.on('notificationDisplay', (notification) => {
        onReceiveNotification(notification.data, options);
      });
    });

  } catch (error) {
    console.error(error);
  }

}

export async function checkPermission(method, args) {
  try {
    if (!OneSignal) { return; }

    return OneSignal.isPushNotificationsEnabled().then((enabled) => {
      if (enabled) {
        return OneSignal.getUserId().then((userId) => {
          if (userId) {
            OneSignal[method](...args);
          }

          return Promise.resolve();
        });
      }

      return Promise.resolve();
    });
  } catch (error) {
    console.log(error);
  }
}

export async function sendTagForNotification(data: IOptionNotification) {
  log.debug('Onesignal set Email: ' + data.user.email);
  // await checkPermission('setEmail', [data.user.notificationEmail]);
  log.debug('Onesignal set tag: userId = ' + data.user.id);
  await checkPermission('sendTag', ['userId', data.user.id]);
}

export async function deleteTagForNotification() {
  log.debug('Onesignal delete tag: userId');
  await checkPermission('deleteTag', ['userId']);
  log.debug('Onesignal logout email');
  OneSignal.logoutEmail();
}

export function handelUserForSubscribed() {
  log.debug('Handel subscribed');
  const userId = localStorage.getItem(KeyUserIDForOneSignal);
  if (userId) {
    sendTagForNotification(<any> {
      user: {
        id: userId
      }
    });
  }

  return;
}

export interface IDataNotification {
  content: string;
  receiverIds: number[];
  referenceId: string;
  title: string;
  type: string;
  metadata: any;
}

export function onReceiveNotification(data: IDataNotification, options: IOptionNotification) {
  if (data && data.referenceId) {
    options.onReceiveNotification(data);

    const endClass = '';
    switch (data.type) {
    default:
      break;
    }

    const instanceNotification: any = Notification({
      duration: 60000,
      title: data.title,
      customClass: `notification-top notification-top--${endClass}`,
      dangerouslyUseHTMLString: true,
      message: `<p class="text"><span class="icon icon__${endClass}"></span>${data.content}</p>`,
      offset: 35,
      showClose: true,
      onClick: () => {
        options.onClickNotification(data);
        instanceNotification.close();
      }
    });
  }

  return;
}
