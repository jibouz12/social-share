import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss'],
})
export class SpinComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('')
    }, 2000);
  }

}
