import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenItemsPipe } from './pipes/orden-items.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenItemsPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }