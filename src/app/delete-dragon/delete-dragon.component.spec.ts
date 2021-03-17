import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDragonComponent } from './delete-dragon.component';

describe('DeleteDragonComponent', () => {
  let component: DeleteDragonComponent;
  let fixture: ComponentFixture<DeleteDragonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDragonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
