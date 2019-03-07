import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../quizz/quizz.service';
import { QuestionService } from '../question/question.service';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Quizz } from '../quizz/quizz.model';

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styleUrls: ['./quizz-form.component.css']
})
export class QuizzFormComponent implements OnInit {
  questionFieldsSubscription: Subscription;
  questionFields: string[];
  questionDifficulties: string[];
  newQuizzForm: FormGroup;
  contentsArray: FormArray = new FormArray([]);;

  constructor(private questionService: QuestionService, private quizzService:QuizzService) { }

  ngOnInit() {
    this.questionFieldsSubscription = this.questionService.questionFieldsChanged
      .subscribe(
        (questionFields: string[]) => {
          this.questionFields = questionFields;
          console.log("new quizzList : ");
          for (let q of this.questionFields) {
            console.log(q);
          }
        }
      );
    this.questionService.getAllQuestionFields();

    this.newQuizzForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'contents': this.contentsArray
    },[this.checkContentPresent]);
    this.questionDifficulties = ['NOVICE', 'ADVANCED', 'EXPERT'];
  }

  onAddContent() {
    this.contentsArray.push(new FormGroup({
      'field': new FormControl('', Validators.required),
      'difficulty': new FormControl('', Validators.required),
      'number': new FormControl('', [Validators.required, Validators.min(1)])
    }))
  }

  onDeleteContent(index: number) {
    (<FormArray>this.newQuizzForm.get('contents')).removeAt(index);
  }

  onSaveQuizz(){
   this.quizzService.saveNewQuizz(this.newQuizzForm);
  }

  checkContentPresent(group: FormGroup) { // here we have the 'passwords' group
  let contents:any[] = group.get('contents').value;
  return contents.length > 0 ? null : { empty: true }     
}

}
