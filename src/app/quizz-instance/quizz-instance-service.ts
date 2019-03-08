import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzInstance } from './quizz-instance-model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class QuizzInstanceService {

    quizzInstance: QuizzInstance;
    quizzInstanceLoaded = new Subject<QuizzInstance>();

    constructor(
        private httpClient: HttpClient,
        private routerService: Router
    ) { }

    getQuizzInstance(quizzId: string, candidateMail?: string):Observable<any> {
        let url = 'http://localhost:8080/quizz-instances/' + quizzId;
        if (candidateMail) {
            url += '?mail=' + candidateMail;
        }
       return this.httpClient.get<QuizzInstance>(url, {
            observe: 'body',
            responseType: 'json'
        });  
    }
}