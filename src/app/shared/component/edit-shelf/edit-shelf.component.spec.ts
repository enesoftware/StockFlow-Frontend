import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShelfComponent } from './edit-shelf.component';

describe('EditShelfComponent', () => {
  let component: EditShelfComponent;
  let fixture: ComponentFixture<EditShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditShelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
