import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-shelf-dialog',
  templateUrl: './create-shelf-dialog.component.html',
  styleUrl: './create-shelf-dialog.component.scss',
})
export class CreateShelfDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateShelfDialogComponent>) {}
  count: number = 1;

  addShelf() {
    this.dialogRef.close({ result: this.count });
  }
}
