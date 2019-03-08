import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizzService } from '../quizz.service';
import { Quizz } from '../quizz.model';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.css']
})
export class QuizzListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  quizz: Quizz[];

  constructor(private quizzService: QuizzService, private routerService: Router) { }

  ngOnInit() {
    this.getAllQuizz();
  }

  getAllQuizz() {
    this.quizzService.getAllQuizz().pipe(takeUntil(this.destroy$))
      .subscribe(
        (quizz: Quizz[]) => {
          console.log(quizz)
          this.quizz = quizz;
        }
      );
  }
  onActivateQuizz(id: number) {
    this.quizzService.activate(id).pipe(takeUntil(this.destroy$)).subscribe({
      complete: () => this.getAllQuizz()
    });
  }

  onDeactivateQuizz(id: number) {
    this.quizzService.deactivate(id).pipe(takeUntil(this.destroy$)).subscribe({
      complete: () => this.getAllQuizz()
    });
  }

  onGetLink(id: number) {
    this.routerService.navigate(['/quizz-link', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
