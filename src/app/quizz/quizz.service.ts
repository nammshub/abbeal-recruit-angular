import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Quizz } from './quizz.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class QuizzService {

  quizzChanged = new Subject<Quizz[]>();
  private quizz:Quizz[] = [];

  constructor (
    private httpClient: HttpClient
  ) {}

  getAllQuizz() {
    this.httpClient.get<Quizz[]>('http://localhost:8080/quizz', {
      observe: 'body',
      responseType: 'json'
    })
      .subscribe(
        (quizz: Quizz[]) => {
          console.log(quizz)
          this.quizz = quizz;
          this.quizzChanged.next(this.quizz.slice());
        }
      );
    
  }

}