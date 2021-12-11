import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavBarComponent implements OnInit {
  @Input() nombre:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
