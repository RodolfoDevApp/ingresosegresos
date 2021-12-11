import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ChartData, ChartType } from 'chart.js';
import { AppsStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }]
  };
  public doughnutChartType: ChartType = 'doughnut';
  //variables
  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  constructor(
    private store: Store<AppsStateWithIngresoEgreso>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items))
  }

  generarEstadistica(items: IngresoEgreso[]) {
    
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
    
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += Number(item.monto);
        this.ingresos++;
      } else {
        this.totalEgresos += Number(item.monto);
        this.egresos++;
      }
    }
    this.doughnutChartData.datasets = [{ data: [this.totalIngresos, this.totalEgresos] }]
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
