import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCountTargetComponent } from './request-count-target.component';

describe('RequestCountTargetComponent', () => {
  let component: RequestCountTargetComponent;
  let fixture: ComponentFixture<RequestCountTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCountTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCountTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
