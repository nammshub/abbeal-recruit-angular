import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { QuizzInstanceService } from './quizz-instance-service';
import { QuizzInstance } from './quizz-instance-model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../user/user.model';

@Component({
  selector: 'app-quizz-instance',
  templateUrl: './quizz-instance.component.html',
  styleUrls: ['./quizz-instance.component.css']
})
export class QuizzInstanceComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  quizzInstance: QuizzInstance;
  quizzId: string;
  candidateMail: string;
  link: string;
  questionsArray: FormArray = new FormArray([]);;
  quizzCandidateForm: FormGroup;

  constructor(private route: ActivatedRoute, private routerService: Router, private quizzInstanceService: QuizzInstanceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.quizzCandidateForm = new FormGroup({
      'quizzId': new FormControl(),
      'candidateMail': new FormControl('', [Validators.email, Validators.required]),
      'questions': this.questionsArray
    });
    this.quizzId = this.route.snapshot.paramMap.get('id');
    this.quizzCandidateForm.controls.quizzId.setValue(this.quizzId);
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.candidateMail = params['candidateMail'];
      this.quizzInstanceService.getQuizzInstance(this.quizzId, this.candidateMail ? this.candidateMail : null).pipe(takeUntil(this.destroy$)).subscribe(
        (quizzInstance: QuizzInstance) => {
          this.quizzInstance = quizzInstance;
          if (!this.quizzInstance.candidate) {
            this.quizzInstance.candidate = new User(null, '', '', '', '');
          }
          this.quizzCandidateForm.get('candidateMail').setValue(this.quizzInstance.candidate.mail);
          for (let actualQuestion of this.quizzInstance.actualQuestions) {
            this.questionsArray.push(new FormGroup({
              'id': new FormControl(actualQuestion.question.id),
              'answers': new FormArray([])
            }))
          }
        },
        exception => {
          console.log(exception.error);
        }
      );
    });
  }

  onClickAnswer(questionIter: number, answerIter: number, event) {
    let answers: FormArray = this.quizzCandidateForm.controls['questions'].at(questionIter).controls['answers'];
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      //answers.push(new FormControl(event.target.value));
      answers.push(new FormGroup({
        'id': new FormControl(event.target.value)
      }))
    }
    /* unselected */
    else {
      let iter = -1;
      let answerIter = -1
      for (let answer of answers.controls) {
        iter++;
        if (answer.get('id').value === event.target.value) {
          answerIter = iter;
        }
      }
      answers.removeAt(answerIter);
    }
  }

  onSubmit() {
    this.quizzInstanceService.submitQuizz(this.quizzCandidateForm).pipe(takeUntil(this.destroy$)).subscribe({
      next: quizzInstanceReturn=> {
        console.log(quizzInstanceReturn);
        this.quizzInstanceService.warnQuizzCreator(quizzInstanceReturn);
        this.routerService.navigate(['/quizz']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
