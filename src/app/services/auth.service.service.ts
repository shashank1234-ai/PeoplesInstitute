import { Injectable ,NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument,
  } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData:any

  constructor(
    public afs: AngularFirestore,
    public afAuth:AngularFireAuth,
    public ngZone:NgZone
  ) { 
    this.afAuth.authState.subscribe((user:any)=>{
      if(user){
          this.userData = user;
          console.log((this.userData))
          // retrieve the data from User table and store in session
      }
  })
  }
  login(email:any,password:any){
    return this.afAuth.signInWithEmailAndPassword(email,password)
    }

    SetUserData(user:any){
      const userref:AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.id}`
      );
      const UserData:any={
        uid:user.uid,
        email:user.email
      }
      return userref.set(UserData,{
        merge:true
      });
    }
}
