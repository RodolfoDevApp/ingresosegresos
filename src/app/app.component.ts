import { Component } from '@angular/core';
import { ServiceService } from './auth/service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingresoEgresoApp';
  constructor(
    private service:ServiceService
  ){
    this.service.initAuthListener();
  }
}
