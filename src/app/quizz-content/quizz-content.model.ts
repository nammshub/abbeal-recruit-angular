export class QuizzContent {
    public id:number;
    public field:string;
    public difficulty:string;
    public number:number;
  
    constructor(id:number, field:string, difficulty: string, number:number) {
      this.id = id;
      this.field = field;
      this.difficulty = difficulty;
      this.number = number;
    }
  }