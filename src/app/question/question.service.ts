import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuestionService {

  questionFieldsChanged = new Subject<string[]>();
  private questionFields: string[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllQuestionFields():Observable<any> {
    return this.httpClient.get<string[]>(environment.baseBackUrl+'/questions/fields', {
      observe: 'body',
      responseType: 'json'
    });
  }
}