import { Injectable } from '@angular/core';
import { User } from '../app/user'
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";

import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';

//import { relativeTimeRounding } from 'moment';
import { switchMap } from "rxjs/operators";
import { ToastController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;


  constructor(public afAuth:AngularFireAuth,private alertCtrl: AlertController, private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user)=>{
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
   }

   async presentAlert(error) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: error,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  async getCurrentUID(): Promise<void>{
  //let uid = await this.afAuth.currentUser()
  }

  isEmailVerified(user:User): boolean{
    return user.emailVerified === true ? true:false;
  }

  async resetPassword(email: string): Promise<void> {
    try{
      return await this.afAuth.sendPasswordResetEmail(email);
    
    }
    catch(error){
      console.log("Error:",error)
      this.presentAlert(error);
    }
  }

  async loginGoogle(): Promise<User> {
    try{
      const {user} = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user
    }
    catch(error){
      console.log("Error:",error)
      this.presentAlert(error);
    }
  } 

  async register(email:string,password:string,displayName: string): Promise<User> {
    try{
      const {user} = await this.afAuth.createUserWithEmailAndPassword(email,password);
      await this.sendVerificationEmail();
      this.updateUserDataReg(user,displayName);
      return user
    }
    catch(error){
      console.log("Error:",error)
      this.presentAlert(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try{
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch(error){
      console.log("Error:",error)
      this.presentAlert(error);
    }
  }

  async login(email:string,password:string): Promise<User> {
    try{
      const {user} = await this.afAuth.signInWithEmailAndPassword(email,password);
      //this.updateUserData(user);
      return user
    }
    catch(error){
      console.log("Error:",error)
      this.presentAlert(error);
    }
  }

  private updateUserDataReg(user:User,name){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data:User = {
      uid:user.uid,
      email:user.email,
      emailVerified: user.emailVerified,
      displayName: name,
    };
    return userRef.set(data, {merge:true });
  }

    private updateUserData(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data:User = {
      uid:user.uid,
      email:user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, {merge:true });
  }

  async logout(): Promise<void> {
    try{
      await this.afAuth.signOut();
    }
    catch(error){
      console.log("Error:",error)
      this.presentAlert(error);
    }
  }


}