import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzInstanceComponent } from './quizz-instance.component';

describe('QuizzInstanceComponent', () => {
  let component: QuizzInstanceComponent;
  let fixture: ComponentFixture<QuizzInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
