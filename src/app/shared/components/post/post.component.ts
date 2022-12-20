import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GPS } from 'src/app/core/models/GPS.model';
import { GPSService } from 'src/app/core/services/GPS.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: GPS;
  post$!: Observable<GPS>

  constructor(private GPSService : GPSService) { }

  ngOnInit() {

  }

}
