import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  itemsArr: IngresoEgreso[] = [];
  itemsSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.itemsSubscription = this.store.select('ingresoEgreso')
      .subscribe(({items}) => this.itemsArr = items);
  }
  borrar(uid:string){
    // console.log(uid);
    this.ingresoEgresoService.borrarItem(uid)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'))
  }

}
