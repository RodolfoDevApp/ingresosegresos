import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ServiceService } from '../auth/service/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private service: ServiceService,
    private router:Router
  ){}

  canLoad(): Observable<boolean> {
    return this.service.isAuth()
      .pipe(
        tap(res => {
          if (!res) {
            this.router.navigate(['/login'])
          }
        }),
        take(1)
      );
  }
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
