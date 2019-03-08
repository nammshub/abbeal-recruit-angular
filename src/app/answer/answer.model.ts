export class Answer{
    id:number;
    statement:string;
    correct:boolean;

    constructor(id:number,statement:string,correct:boolean){
        this.id = id;
        this.statement = statement;
        this.correct = correct;
    }

}