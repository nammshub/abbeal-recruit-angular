import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../user/login.service';
import { User } from '../user/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private loginService: LoginService, private routerService: Router) {

  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'mail': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)])
    }, [this.checkPasswords]);
  }

  onSubmit() {
    console.warn(this.signUpForm.value);
    const user: User = new User(null, this.signUpForm.controls.firstName.value, this.signUpForm.controls.lastName.value, this.signUpForm.controls.mail.value, null, this.signUpForm.controls.password.value);
    this.loginService.signup(user).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loginService.login(user.mail, user.password).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.loginService.loggedIn();
            this.routerService.navigate(['/quizz']);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
