import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  email = new FormControl('', [Validators.required, Validators.email]);
  phoneNo = new FormControl('', [Validators.required, Validators.minLength(4)]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  terms = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    username: this.username,
    email: this.email,
    phoneNo: this.phoneNo,
    password: this.password,
    confirmPassword: this.confirmPassword,
    terms: this.terms,
  });

  constructor(
    fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit() {
    this.userService.createUser(this.registerForm.value).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.registerForm.reset();
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
