import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizzService } from '../quizz/quizz.service';
import { QuestionService } from '../question/question.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz-form',
  templateUrl: './quizz-form.component.html',
  styleUrls: ['./quizz-form.component.css']
})
export class QuizzFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  questionFieldsSubscription: Subscription;
  questionFields: string[];
  questionDifficulties: string[];
  newQuizzForm: FormGroup;
  contentsArray: FormArray = new FormArray([]);;

  constructor(private questionService: QuestionService, private quizzService: QuizzService, private routerService: Router) { }

  ngOnInit() {
    this.questionFieldsSubscription = this.questionService.questionFieldsChanged.pipe(takeUntil(this.destroy$))
      .subscribe(
        (questionFields: string[]) => {
          this.questionFields = questionFields;
        }
      );
    this.questionService.getAllQuestionFields().pipe(takeUntil(this.destroy$))
      .subscribe(
        (questionFields: string[]) => {
          this.questionFields = questionFields;
        }
      );

    this.newQuizzForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'contents': this.contentsArray
    }, [this.checkContentPresent]);
    this.questionDifficulties = ['NOVICE', 'ADVANCED', 'EXPERT'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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

  onSaveQuizz() {
    this.quizzService.saveNewQuizz(this.newQuizzForm).pipe(takeUntil(this.destroy$)).subscribe({
      next: x => {
        console.log(x);
        this.routerService.navigate(['/quizz']);
      }
    });
  }

  checkContentPresent(group: FormGroup) { // here we have the 'passwords' group
    let contents: any[] = group.get('contents').value;
    return contents.length > 0 ? null : { empty: true }
  }

}
