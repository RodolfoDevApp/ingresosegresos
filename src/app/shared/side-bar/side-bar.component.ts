import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { ServiceService } from 'src/app/auth/service/service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit, OnDestroy {
  
  nombre: string = '';
  userSubs!: Subscription;

  constructor(
    private service: ServiceService,
    private router: Router,
    private store: Store<AppState>
  ) { }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
                      .pipe(
                        filter(({user}) => user != null)
                      )
                      .subscribe(({user}) => this.nombre = user?.nombre!);
  }
  
  logout(){
    this.service.logout()
      .then(()=>{
        this.router.navigate(['/login']);
      });
  }

}
