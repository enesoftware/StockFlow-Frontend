import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-shelf',
  templateUrl: './edit-shelf.component.html',
  styleUrl: './edit-shelf.component.scss',
})
export class EditShelfComponent {
  constructor(
    public dialogRef: MatDialogRef<EditShelfComponent>,
    private formBuilder: FormBuilder
  ) {}

  closeDialog() {
    this.dialogRef.close({
      object: this.editForm,
    });
  }

  editForm = this.formBuilder.nonNullable.group({
    quantity: [1, [Validators.required, Validators.pattern(/[\S]/)]],
  });
}
