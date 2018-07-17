import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookissuedComponent } from './bookissued.component';

describe('BookissuedComponent', () => {
  let component: BookissuedComponent;
  let fixture: ComponentFixture<BookissuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookissuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookissuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
