import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../user/login.service';
import { User } from '../user/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private loginService: LoginService, private routerService: Router) {

  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'userName': new FormControl(''),
      'password': new FormControl('', [Validators.required/*, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)*/]),
    });
  }

  onSubmit() {
    console.warn(this.signInForm.value);
    this.loginService.login(this.signInForm.controls.userName.value,this.signInForm.controls.password.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loginService.loggedIn();
        this.routerService.navigate(['/quizz']);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
