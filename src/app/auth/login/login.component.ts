import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private service:ServiceService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    });
  }

  login(){
    console.log(this.loginForm.valid);
    if (this.loginForm.invalid) {return;}

    Swal.fire({
      title:'Espere por favor',
      didOpen:()=>{
        Swal.showLoading()
      }
    });

    const {email,password} = this.loginForm.value;
    this.service.login(email,password)
      .then(res => {
        Swal.close();
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }
}
