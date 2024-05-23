import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrl: './create-item-dialog.component.scss',
})
export class CreateItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  itemForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    min_quantity: [1, [Validators.required, Validators.pattern(/[\S]/)]],
    quantity: [1, [Validators.required, Validators.pattern(/[\S]/)]],
  });

  name: string = '';

  createItem() {
    this.dialogRef.close({
      object: this.itemForm,
    });
    console.log('item dialog' + this.name);
  }
}
