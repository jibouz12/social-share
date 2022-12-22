import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  constructor(private router : Router,
              private authService : AuthService) { }

  ngOnInit() {
    
  }

  onClick(e : string) {
    this.authService.updateAvatar(e).pipe(
      take(1),
      tap(() => {
        localStorage.setItem('avatar', e)
      }),
      tap(() => {
        this.router.navigateByUrl('tabs/tab3').then(() => {
          location.reload()
        })
      }),
    ).subscribe()
  }

}
