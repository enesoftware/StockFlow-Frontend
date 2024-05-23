import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../core/service/login/login.service';
import { UserPassword } from '../dto/userPassword';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private service: LoginService,
    private formBuilder: FormBuilder
  ) {}
  dto: UserPassword = { userEmail: '', password: '', newPassword: '' };
  // Minimums eight characters, at least one letter
  // and one number: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'

  userForm = this.formBuilder.nonNullable.group(
    {
      email: [''],
      role: [''],
      oldPassword: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.minLength(8),
          Validators.required,
          Validators.pattern(/[\S]/),
        ],
      ],
      newPasswordControl: ['', [Validators.minLength(8), Validators.required]],
    },
    {
      validators: [
        this.pwLength,
        this.pwDigit,
        this.pwLetter,
        this.pwBigLetter,
        this.combinedValidator,
      ],
    }
  );

  // Validators

  combinedValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const newPasswordControl = control.get('newPasswordControl')?.value;

    // Boşluk kontrolü
    const hasWhitespace = (value: string) => (value || '').trim().length === 0;

    // Şifre eşleşme kontrolü
    const passwordsMatch = newPassword === newPasswordControl;

    return passwordsMatch && !hasWhitespace(newPassword) && passwordsMatch
      ? null
      : { mismatch: true };
  }

  // passwordMatchValidator(control: AbstractControl) {
  //   return control.get('newPassword')?.value ===
  //     control.get('newPasswordControl')?.value
  //     ? null
  //     : { mismatch: true };
  // }
  // public noWhitespaceValidator(control: FormControl) {
  //   return (control.value || '').trim().length ? null : { whitespace: true };
  // }

  pwLength(control: AbstractControl) {
    let password = control.get('newPassword')?.value;
    if (password.length < 8) {
      return { minLength: true };
    }
    return null;
  }

  pwDigit(control: AbstractControl) {
    let password = control.get('newPassword')?.value;
    if (password.search(/[0-9]/) < 0) {
      // console.log('Your password must contain at least one digit.');
      return { digit: true };
    }
    return null;
  }

  pwLetter(control: AbstractControl) {
    let password = control.get('newPassword')?.value;
    if (password.search(/[a-z]/) < 0) {
      return { letter: true };
    }
    return null;
  }

  pwBigLetter(control: AbstractControl) {
    let password = control.get('newPassword')?.value;
    if (password.search(/[A-Z]/) < 0) {
      return { letterBig: true };
    }
    return null;
  }

  ngOnInit(): void {
    let email = this.service.getEmail();

    this.userService.getUser(email!).subscribe({
      next: (data) => {
        this.userForm.patchValue({
          email: data.email,
          role: this.service.getRole(),
        });
      },
    });
  }

  submit() {
    this.dto = {
      userEmail: this.userForm.get('email')?.value!,
      newPassword: this.userForm.get('newPassword')?.value!,
      password: this.userForm.get('oldPassword')?.value!,
    };
    //console.log(this.dto);
    this.userService.changePassword(this.dto).subscribe({
      next: (data) => {
        this.toastr.success(data.message, 'Profile System', {
          timeOut: 2000,
        });
      },
      error: (err) => {
        //console.log(err.error.message);

        this.toastr.error(err.error.message, 'Profile System', {
          timeOut: 2000,
        });
      },
    });
  }

  reset() {
    this.userForm.patchValue({
      oldPassword: '',
      newPassword: '',
      newPasswordControl: '',
    });
  }
}
