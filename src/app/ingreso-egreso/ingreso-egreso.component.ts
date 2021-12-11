import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from './services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  
  ingresoForm!: FormGroup;
  tipo:string = 'ingreso';
  cargar:boolean = false;
  uiSubscribe!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgreso: IngresoEgresoService,
    private store:Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.uiSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion:['', Validators.required],
      monto:['', Validators.required]
    });

    this.uiSubscribe = this.store.select('ui')
      .subscribe( ui => this.cargar = ui.isLoading);
  }

  guardar(){
    
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresosEgreso = new IngresoEgreso(descripcion,monto, this.tipo);
    this.ingresoEgreso.crearIngresoEgreso(ingresosEgreso)
    .then(()=> {
        this.store.dispatch(ui.stopLoading());
        this.ingresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch(err => {        
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message , 'error');
      });
  }

}
