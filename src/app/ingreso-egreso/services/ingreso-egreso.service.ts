import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceService } from 'src/app/auth/service/service.service';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  userSubscription!: Subscription;

  constructor(
    private firestore: AngularFirestore,
    private auth: ServiceService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${this.auth.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
      // .then((ref) => console.log('exito!', ref))
      // .catch(err => console.warn(err));
  }

  initIngresoEgresoListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      // .valueChanges()
      .snapshotChanges()
      .pipe(
        // map(res => {
        //   return res.map( doc => {
        //     // console.log(doc.payload.doc.data());
        //     // const data:any = doc.payload.doc.data();
        //     return {
        //       uid: doc.payload.doc.id,
        //       // ...data
        //       ...doc.payload.doc.data() as object
        //     }
        //   } );
        // })
        map(res => res.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as IngresoEgreso
        })
        )
        )
      );
      // .subscribe(res => {
      //   console.log(res);
      // });
  }

  borrarItem(uidItem:string){
    const uidUser = this.auth.user.uid; 
    return this.firestore.doc(`${uidUser}/ingresos-egresos/items/${uidItem}`).delete();
  }

}
