import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Quizz } from './quizz.model';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()
export class QuizzService {

  quizzChanged = new Subject<Quizz[]>();
  private quizz: Quizz[] = [];

  constructor(
    private httpClient: HttpClient,
    private routerService: Router
  ) { }

  getAllQuizz(): Observable<any> {
    return this.httpClient.get<Quizz[]>('http://localhost:8080/quizz', {
      observe: 'body',
      responseType: 'json'
    });

  }

  saveNewQuizz(newQuizzForm: FormGroup): Observable<any> {
    console.log('inside saveNEwQuizz');
    let quizzContents = [];
    for (let content of newQuizzForm.get('contents').value) {
      quizzContents.push({
        "field": content.field,
        "difficulty": content.difficulty,
        "number": content.number
      })
    }
    return this.httpClient.post('http://localhost:8080/users/1/quizz',
      {
        "name": newQuizzForm.get('name').value,
        "quizzContents": quizzContents
      });
  }

  activate(id: number): Observable<any> {
    return this.httpClient.patch('http://localhost:8080/quizz/' + id + '/activate',
      {});
  }

  deactivate(id: number): Observable<any> {
    return this.httpClient.patch('http://localhost:8080/quizz/' + id + '/deactivate',
      {});
  }


}