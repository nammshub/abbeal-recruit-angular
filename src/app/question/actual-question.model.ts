import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { QuizzInstance } from '../quizz-instance/quizz-instance-model';

export class ActualQuestion {
    question:Question;

    constructor(question:Question){
        this.question = question;
    }
}