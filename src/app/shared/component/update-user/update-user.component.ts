import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      lastName: string;
      email: string;
      roleId: number;
    }
  ) {}

  userForm = this.formBuilder.nonNullable.group({
    name: [this.data.name, [Validators.required, Validators.pattern(/[\S]/)]],
    lastName: [
      this.data.lastName,
      [Validators.required, Validators.pattern(/[\S]/)],
    ],
    email: [this.data.email, [Validators.required, Validators.pattern(/[\S]/)]],
    role: [this.data.roleId, [Validators.required, Validators.pattern(/[\S]/)]],
    boolean: [false],
  });

  updateUser() {
    this.dialogRef.close({
      object: this.userForm,
    });
    // console.log(this.data);aaa
  }
}
