import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShelfDialogComponent } from './create-shelf-dialog.component';

describe('CreateShelfDialogComponent', () => {
  let component: CreateShelfDialogComponent;
  let fixture: ComponentFixture<CreateShelfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateShelfDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateShelfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
