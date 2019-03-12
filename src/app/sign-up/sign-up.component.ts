import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 signUpForm:FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'mail':new FormControl('', [Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)]),
      'confirmPassword':new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/)])
    },[this.checkPasswords]);
  }

  onSubmit(){
    console.warn(this.signUpForm.value);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }     
}

}
