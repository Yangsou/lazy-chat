import { getFirebaseApp } from './firebaseInit';
import { IAuthService } from './types';

export function FirebaseAuthService(): IAuthService {

  return {
    createUserWithEmailAndPassword: (email, password) =>
      getFirebaseApp().auth()
      .createUserWithEmailAndPassword(email, password),
    signInWithEmailAndPassword: (form: any) =>
      getFirebaseApp().auth()
      .signInWithEmailAndPassword(form.email, form.password),
    signOut: () => getFirebaseApp().auth().signOut(),
    onAuthStateChanged: (func) => getFirebaseApp().auth().onAuthStateChanged(func),
    getIdToken: () => {
      const user = getFirebaseApp().auth().currentUser;

      return user ? user.getIdToken() : Promise.resolve(null);
    }
  };
}
