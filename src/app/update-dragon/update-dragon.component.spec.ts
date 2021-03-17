import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDragonComponent } from './update-dragon.component';

describe('UpdateDragonComponent', () => {
  let component: UpdateDragonComponent;
  let fixture: ComponentFixture<UpdateDragonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDragonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
