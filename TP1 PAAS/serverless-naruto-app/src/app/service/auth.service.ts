import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User | null>;


  constructor(private firebaseAuth: AngularFireAuth) {

    this.user = firebaseAuth.authState;

  }

  signup(email: string, password: string) {

    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then((value) => {

      console.log("Account Created Successfully.");

    }).catch((error) => {
      console.error((error));
    })

  }

  login(email: string, password: string) {

    this.firebaseAuth.signInWithEmailAndPassword(email, password).then((value) => {

      console.log("Account Created Successfully.");

    }).catch((error) => {
      console.error((error));
    });
  }

  logout() { }

}
