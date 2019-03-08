import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuestionService {

  questionFieldsChanged = new Subject<string[]>();
  private questionFields: string[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllQuestionFields():Observable<any> {
    return this.httpClient.get<string[]>('http://localhost:8080/questions/fields', {
      observe: 'body',
      responseType: 'json'
    });
  }
}