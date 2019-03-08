import { User } from '../user/user.model';
import { Question } from '../question/question.model';

export class QuizzInstance {
    candidate: User;
    creationDate:Date;
    actualQuestions:Question[];

    constructor(candidate:User,creationDate:Date,actualQuestions:Question[]){
        this.candidate = candidate;
        this.creationDate = creationDate;
        this.actualQuestions = actualQuestions;
    }
}