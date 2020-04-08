import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorisationComponent } from './valorisation.component';

describe('ValorisationComponent', () => {
  let component: ValorisationComponent;
  let fixture: ComponentFixture<ValorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
