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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizzComponent,
    QuizzInstanceComponent,
    QuizzListComponent,
    UserComponent,
    QuizzContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    QuizzService,
    HttpClient
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
