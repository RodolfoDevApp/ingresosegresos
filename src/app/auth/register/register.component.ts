import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiceService } from '../service/service.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  registroForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;  

  constructor(
    private fb:FormBuilder,
    private auth: ServiceService,
    private  router:Router,
    private store: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
                            .subscribe( ui => this.cargando = ui.isLoading );
  }
  crearUsuario(){
  if (this.registroForm.invalid) {return;}
  // Swal.fire({
  //   title:'Espere por favor',
  //   didOpen:()=>{
  //     Swal.showLoading()
  //   }
  // });

  this.store.dispatch(ui.isLoading());

  const {nombre, correo, password} = this.registroForm.value;
  this.auth.crearUsuario(nombre, correo, password)
      .then(res => {
        // console.log(res);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  
}

}
