import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDetailsComponent } from './curso-details.component';

describe('CursoDetailsComponent', () => {
  let component: CursoDetailsComponent;
  let fixture: ComponentFixture<CursoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
