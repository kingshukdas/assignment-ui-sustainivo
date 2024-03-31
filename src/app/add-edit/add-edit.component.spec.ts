import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditComponent } from './add-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../shared/app.model';
import { provideAnimations } from '@angular/platform-browser/animations';

const dialogDataStub : DialogData = {
  title: 'Add new product'
}

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogDataStub },
        { provide: MatDialogRef, useValue: {}},
        provideAnimations()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
