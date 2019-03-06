import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzContentComponent } from './quizz-content.component';

describe('QuizzContentComponent', () => {
  let component: QuizzContentComponent;
  let fixture: ComponentFixture<QuizzContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
