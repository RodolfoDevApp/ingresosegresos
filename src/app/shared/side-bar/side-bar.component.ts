import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/auth/service/service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  constructor(
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.service.logout()
      .then(()=>{
        this.router.navigate(['/login']);
      });
  }

}
