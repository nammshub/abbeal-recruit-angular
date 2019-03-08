import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { QuizzInstanceService } from './quizz-instance-service';
import { QuizzInstance } from './quizz-instance-model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quizz-instance',
  templateUrl: './quizz-instance.component.html',
  styleUrls: ['./quizz-instance.component.css']
})
export class QuizzInstanceComponent implements OnInit,OnDestroy {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  quizzInstance: QuizzInstance;
  quizzId: string;
  candidateMail: string;
  quizzInstanceForm: FormGroup;
  link: string;

  constructor(private route: ActivatedRoute, private router: Router, private quizzInstanceService: QuizzInstanceService) { }

  ngOnInit() {
    this.quizzId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.candidateMail = params['candidateMail'];
      console.log('candidate mail : ' + this.candidateMail);
      this.quizzInstanceService.getQuizzInstance(this.quizzId, this.candidateMail ? this.candidateMail : null).pipe(takeUntil(this.destroy$)).subscribe(
        (quizzInstance: QuizzInstance) => {
          console.log(quizzInstance)
          this.quizzInstance = quizzInstance;
        },
        exception => {
          console.log(exception.error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
