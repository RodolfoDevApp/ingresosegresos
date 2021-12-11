import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {map} from 'rxjs/operators'
import { Usuario } from 'src/app/models/usuario.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as auth from '../auth.actions';
import { Subscription } from 'rxjs';
import { UnSetItems } from 'src/app/ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  
  userSubs!: Subscription;
  private _user!: Usuario | null;

  get user(){
    return {...this._user};
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }
  
  initAuthListener(){
    this.auth.authState.subscribe(fuser =>{
      // console.log('fuser', fuser);
      if (fuser) {
        this.userSubs = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((res:any) => {
          console.log('set');
          const user = Usuario.fromFirebase(res);
          this._user = user;
          this.store.dispatch(auth.setUser({user}));       
        });
      } else {
        this._user = null;
        this.userSubs?.unsubscribe();
        this.store.dispatch( auth.unSetUser());
        this.store.dispatch(UnSetItems());
      }
    })
  }

  crearUsuario(nombre:string, correo:string, password:string){
    return this.auth.createUserWithEmailAndPassword(correo, password)
    .then( ({user}) => {
      const newUser = new Usuario( user!.uid, nombre, correo );
      return this.firestore.doc(`${user?.uid}/usuario`)
        .set({...newUser});
    });
  }

  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }
  isAuth(){
    return this.auth.authState.pipe(
      map( res => res!=null)
    )
  }
}
