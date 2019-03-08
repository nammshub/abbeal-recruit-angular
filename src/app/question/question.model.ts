import { Answer } from '../answer/answer.model';

export class Question {
id:number;
field:string;
difficulty:string;
statement:string;
answers:Answer[];


constructor(id:number,field:string,difficulty:string,statement:string,answers:Answer[]){
    this.id = id;
    this.field = field;
    this.difficulty = difficulty;
    this.statement = statement;
    this.answers = answers;
}
}