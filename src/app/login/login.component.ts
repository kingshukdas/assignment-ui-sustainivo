import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  showInvalidCredsMsg = false;
  showUserNotFound = false;
  errorMsg = '';

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(5)])
    })
  }

  register() {
    
  }

  submit() {
    if(this.loginForm.controls['password']?.untouched || this.loginForm.controls['email']?.untouched) {
      this.showInvalidCredsMsg = true;
      this.errorMsg = 'Please fill all empty fields.';
      return;
    } else {
      if((this.loginForm.controls['email'].invalid ) ||
      (this.loginForm.controls['password']?.invalid && this.loginForm.controls['password']?.dirty)) {
        this.showInvalidCredsMsg = true;
        this.errorMsg = 'Invalid email or password.';
        return;
      } else {
        this.showInvalidCredsMsg = false;
      }
    }
  }
}
