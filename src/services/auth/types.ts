export interface IAuthUser {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
}

export type AuthStateChangedCallback = (user: IAuthUser) => any;

export interface IAuthService {
  signInWithEmailAndPassword(form: any): Promise<any>;
  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
  signOut(): Promise<any>;
  onAuthStateChanged(AuthStateChangeCallback): any;
  getIdToken(): Promise<string>;
}
