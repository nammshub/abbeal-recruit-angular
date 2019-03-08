import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quizz-link',
  templateUrl: './quizz-link.component.html',
  styleUrls: ['./quizz-link.component.css']
})
export class QuizzLinkComponent implements OnInit,OnDestroy {
 
  destroy$: Subject<boolean> = new Subject<boolean>();
  public quizzId: string;
  newLinkForm: FormGroup;
  link: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.quizzId = this.route.snapshot.paramMap.get('id');
    this.newLinkForm = new FormGroup({
      'candidateMail': new FormControl('', Validators.email)
    });
    console.log(this.router.url);
    const baseUrl = window.location.origin + this.router.createUrlTree(['/quizz-instance',this.quizzId]);
    this.link = baseUrl;
    this.newLinkForm.get('candidateMail').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(mail => {
      if (mail !== '') {
        this.link = baseUrl + '?candidateMail=' + mail;
      }
      else {
        this.link = baseUrl;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
