import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VantComponent } from './vant.component';

describe('VantComponent', () => {
  let component: VantComponent;
  let fixture: ComponentFixture<VantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
