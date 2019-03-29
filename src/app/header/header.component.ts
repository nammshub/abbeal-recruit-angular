import { Component, OnInit } from '@angular/core';
import { LoginService } from '../user/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public loginService: LoginService, private routerService: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.loginService.logout().pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loginService.loggedOut();
        this.routerService.navigate(['/signin']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
