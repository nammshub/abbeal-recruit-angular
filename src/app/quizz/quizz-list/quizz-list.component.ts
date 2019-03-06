import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizzService } from '../quizz.service';
import { Quizz } from '../quizz.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.css']
})
export class QuizzListComponent implements OnInit, OnDestroy{
  subscription:Subscription;
  quizz:Quizz[];

  constructor(private quizzService:QuizzService) { }

  ngOnInit() {
    this.subscription = this.quizzService.quizzChanged
    .subscribe(
      (quizz: Quizz[]) => {
        this.quizz = quizz;
        console.log("new quizzList : ");
        for (let q of this.quizz) {
          console.log(q);
        }
        
      }
    );
    this.quizzService.getAllQuizz();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
