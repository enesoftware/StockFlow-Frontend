import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-report-dialog',
  templateUrl: './create-report-dialog.component.html',
  styleUrl: './create-report-dialog.component.scss',
})
export class CreateReportDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateReportDialogComponent>,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userEmail: string;
      itemName: string;
      description: string;
    }
  ) {}

  reportForm = this.builder.nonNullable.group({
    userEmail: [this.data.userEmail],
    itemName: [this.data.itemName],
    description: [
      this.data.description,
      [Validators.required, Validators.pattern(/[\S]/)],
    ],
  });

  yes() {
    this.dialogRef.close({
      object: this.reportForm,
    });
  }

  no() {
    this.dialogRef.close({});
  }
}
