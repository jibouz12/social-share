import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GPS } from 'src/app/core/models/GPS.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: GPS;
  post$!: Observable<GPS>

  constructor() { }

}
