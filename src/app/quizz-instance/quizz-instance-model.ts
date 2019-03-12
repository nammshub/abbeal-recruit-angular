import { User } from '../user/user.model';
import { Question } from '../question/question.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActualQuestion } from '../question/actual-question.model';
import { Quizz } from '../quizz/quizz.model';

export class QuizzInstance {
    
    candidate: User;
    creationDate:Date;
    actualQuestions:ActualQuestion[];
    quizz:Quizz;


    constructor(candidate:User,creationDate:Date,actualQuestions:ActualQuestion[],quizz:Quizz){
        this.candidate = candidate;
        this.creationDate = creationDate;
        this.actualQuestions = actualQuestions;
        this.quizz = quizz;
    }
}