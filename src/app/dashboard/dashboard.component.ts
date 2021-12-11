import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as itemsActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../ingreso-egreso/services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  uiSubscription!: Subscription;
  itemsSubscription!: Subscription;
  nombre: string = '';
  constructor(
    private store: Store<AppState>,
    private ingresoEgreso: IngresoEgresoService
  ) { }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
    )
      .subscribe(({user}) => {
        console.log(user);
        this.nombre = user?.nombre!;
        this.itemsSubscription = this.ingresoEgreso.initIngresoEgresoListener(user?.uid!)
          .subscribe( items => {
            console.log(items);
            this.store.dispatch(itemsActions.setItems({items: items}))
          })
      });
  }

}
