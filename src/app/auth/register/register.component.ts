import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  
  registroForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private auth: ServiceService,
    private  router:Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  crearUsuario(){
  if (this.registroForm.invalid) {return;}
  Swal.fire({
    title:'Espere por favor',
    didOpen:()=>{
      Swal.showLoading()
    }
  });
  const {nombre, correo, password} = this.registroForm.value;
  this.auth.crearUsuario(nombre, correo, password)
      .then(res => {
        console.log(res);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  
}

}