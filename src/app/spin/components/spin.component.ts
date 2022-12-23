import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss'],
})
export class SpinComponent implements OnInit {
  spinner!: boolean;

  constructor(private router : Router) { }

  ngOnInit() {
    this.spinner = true;
    setTimeout(() => {
      this.router.navigateByUrl('feed')
    }, 2000);
  }

}
