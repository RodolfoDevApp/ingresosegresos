import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {map} from 'rxjs/operators'
import { Usuario } from 'src/app/models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }
  
  initAuthListener(){
    this.auth.authState.subscribe(fuser =>{
      console.log('fuser', fuser);
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
