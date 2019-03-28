import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzInstanceComponent } from './quizz-instance/quizz-instance.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { QuizzFormComponent } from './quizz-form/quizz-form.component';
import { QuizzLinkComponent } from './quizz-link/quizz-link.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: 'quizz-form', component: QuizzFormComponent },
  { path: 'quizz-instance/:id', component: QuizzInstanceComponent },
  { path: 'quizz-link/:id', component: QuizzLinkComponent},
  { path: 'quizz', component: QuizzComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin',component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
