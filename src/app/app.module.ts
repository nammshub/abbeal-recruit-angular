import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzInstanceComponent } from './quizz-instance/quizz-instance.component';
import { QuizzListComponent } from './quizz/quizz-list/quizz-list.component';
import { QuizzService } from './quizz/quizz.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { QuizzContentComponent } from './quizz-content/quizz-content.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizzFormComponent } from './quizz-form/quizz-form.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question/question.service';
import { QuizzLinkComponent } from './quizz-link/quizz-link.component';
import { QuizzInstanceService } from './quizz-instance/quizz-instance-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizzComponent,
    QuizzInstanceComponent,
    QuizzListComponent,
    UserComponent,
    QuizzContentComponent,
    SignInComponent,
    SignUpComponent,
    QuizzFormComponent,
    QuestionComponent,
    QuizzLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    QuizzService,
    HttpClient,
    QuestionService,
    QuizzInstanceService,
  
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
