import { User } from '../user/user.model';
import { QuizzContent } from '../quizz-content/quizz-content.model';

export class Quizz {
    public id: number;
    public name: string;
    public creationDate: Date;
    public creator: User;
    public quizzContents: QuizzContent[];
    public active: boolean;

    constructor(id: number, name: string, creationDate: Date, creator: User, quizzContents: QuizzContent[], active: boolean) {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.creator = creator;
        this.quizzContents = quizzContents;
        this.active = active;
    }
}