import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(private elementRef: ElementRef,) { }

  ngOnInit(): void {
  }
  onActivate(event) {
    window.scroll(0, 0);
  }

}
