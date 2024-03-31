import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/login.service';
import { LoginPayload, LoginResponse } from '../shared/app.model';
import { Router } from '@angular/router';

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
  load = false;

  loginSub!: Subscription;

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(5)])
    })
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
        this.load = true;
        this.showInvalidCredsMsg = false;
        const payload : LoginPayload = {
          login: true,
          email: this.loginForm.controls['email'].value,
          password: this.loginForm.controls['password'].value
        };
        this.loginSub = this.loginService.login(payload).subscribe((res: LoginResponse) => {
          if(res.status === 'error') {
            this.load = false;
            this.showUserNotFound = true;
            this.errorMsg = res.message;
          } else {
            this.loginService.setLoggedIn();
            this.router.navigate(['landing']);
            this.load = false;
          }
        });
      }
    }
  }
}
