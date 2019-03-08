import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzLinkComponent } from './quizz-link.component';

describe('QuizzLinkComponent', () => {
  let component: QuizzLinkComponent;
  let fixture: ComponentFixture<QuizzLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
