import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder
  ) {}
  addUser() {
    this.dialogRef.close({
      object: this.userForm,
    });
    // console.log(this.userForm);
  }

  userForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    email: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    role: [2, [Validators.required, Validators.pattern(/[\S]/)]],
  });
}
