import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../auth/service/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: ServiceService,
    private router:Router
  ){}

  canActivate(): Observable<boolean> {
    return this.service.isAuth()
      .pipe(
        tap(res => {
          if (!res) {
            this.router.navigate(['/login'])
          }
        })
      );
  }
  
}
