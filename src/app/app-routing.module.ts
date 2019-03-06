import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzInstanceComponent } from './quizz-instance/quizz-instance.component';

const routes: Routes = [
  { path: 'quizz', component: QuizzComponent },
  { path: 'quizz-instance', component: QuizzInstanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
