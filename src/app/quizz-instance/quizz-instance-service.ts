import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzInstance } from './quizz-instance-model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable()
export class QuizzInstanceService {


    quizzInstance: QuizzInstance;
    quizzInstanceLoaded = new Subject<QuizzInstance>();

    constructor(
        private httpClient: HttpClient,
        private routerService: Router
    ) { }

    getQuizzInstance(quizzId: string, candidateMail?: string): Observable<any> {
        let url = 'http://localhost:8080/quizz-instances/' + quizzId;
        if (candidateMail) {
            url += '?mail=' + candidateMail;
        }
        return this.httpClient.get<QuizzInstance>(url, {
            observe: 'body',
            responseType: 'json'
        });
    }

    submitQuizz(quizzCandidateForm: FormGroup): Observable<any> {
        return this.httpClient.post('http://localhost:8080/quizz-instances',
            {
                "quizzId": quizzCandidateForm.get('quizzId').value,
                "candidateMail": quizzCandidateForm.get('candidateMail').value,
                "questions": quizzCandidateForm.get('questions').value
            });
    }
}