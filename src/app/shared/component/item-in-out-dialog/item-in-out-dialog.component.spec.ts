import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInOutDialogComponent } from './item-in-out-dialog.component';

describe('ItemInOutDialogComponent', () => {
  let component: ItemInOutDialogComponent;
  let fixture: ComponentFixture<ItemInOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemInOutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemInOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
