import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorLogin:boolean = false;

  constructor(private loginService: LoginService, private routerService: Router) {

  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'mail': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required/*, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)*/]),
    });
  }

  onSubmit() {
    console.warn(this.signInForm.value);
    this.loginService.login(this.signInForm.controls.mail.value,this.signInForm.controls.password.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loginService.loggedIn();
        this.errorLogin = false;
        this.routerService.navigate(['/quizz']);
      },
      error: (err) =>{
        this.errorLogin = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
