import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    private clipBoard: Clipboard,
    private toastr: ToastrService,
    private tooltip: MatTooltip
  ) {}

  password: string = '';

  close() {
    this.dialogRef.close();
  }

  copyContent(str: string) {
    this.clipBoard.copy(str);

    this.toastr.success('Coppied to clipboard', 'Success', {
      timeOut: 2000,
    });
  }
}
