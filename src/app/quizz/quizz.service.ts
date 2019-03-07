import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Quizz } from './quizz.model';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable()
export class QuizzService {

  quizzChanged = new Subject<Quizz[]>();
  private quizz: Quizz[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

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

  saveNewQuizz(newQuizzForm: FormGroup): any {
    console.log('inside saveNEwQuizz');
    let quizzContents = [];
    for (let content of newQuizzForm.get('contents').value) {
      quizzContents.push({
        "field": content.field,
        "difficulty": content.difficulty,
        "number": content.number
      })
    }
    return this.httpClient.post('http://localhost:8080/quizz',
      {
        "name": newQuizzForm.get('name').value,
        "quizzContents": quizzContents
      }).subscribe((message)=>{
        console.log(message);
      })
  }


}