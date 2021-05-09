import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVantsComponent } from './list-vants.component';

describe('ListVantsComponent', () => {
  let component: ListVantsComponent;
  let fixture: ComponentFixture<ListVantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
