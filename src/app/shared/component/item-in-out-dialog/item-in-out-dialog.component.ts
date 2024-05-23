import { Component, numberAttribute } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-in-out-dialog',
  templateUrl: './item-in-out-dialog.component.html',
  styleUrl: './item-in-out-dialog.component.scss',
})
export class ItemInOutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ItemInOutDialogComponent>,
    private formBuilder: FormBuilder
  ) {}
  quantity: number = 0;
  question: string = '';
  buttonName: string = '';

  itemInOut() {
    this.dialogRef.close({
      object: this.iteminoutForm,
    });
  }

  iteminoutForm = this.formBuilder.nonNullable.group({
    quantity: [1, [Validators.required, Validators.pattern(/[\S]/)]],
  });
}
