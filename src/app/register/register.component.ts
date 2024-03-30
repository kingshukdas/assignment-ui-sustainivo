import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationPayload, RegistrationResponse } from '../shared/app.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  registrationForm!: FormGroup;

  showInvalidDataMsg!: boolean;
  errorMsg!: string;
  registerSub!: Subscription;
  
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  showUserCannotBeAdded: boolean = false;
  load = false;

  ngOnInit(): void {
    
    const checkReTypedPassword = (value: AbstractControl) => {
      if(this.registrationForm?.controls['password']?.value !== value.value) {
        return {invalid: true}
      }
      return null;
    }

    this.registrationForm = this.fb.group({
      username: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(5)),
      repassword: new FormControl('', [Validators.minLength(5), checkReTypedPassword])
    })
  }

  login() {
    
  }

  submit() {
    if(this.registrationForm.controls['password']?.untouched || this.registrationForm.controls['email']?.untouched 
    || this.registrationForm.controls['username']?.untouched || this.registrationForm.controls['repassword']?.untouched) {
      this.showInvalidDataMsg = true;
      this.errorMsg = 'Please fill all empty fields.';
      return;
    } else {
      if((this.registrationForm.invalid)) {
        this.showInvalidDataMsg = true;
        this.errorMsg = 'Invalid data provided.';
        return;
      } else if(this.registrationForm.controls['repassword'].invalid) {
        this.showInvalidDataMsg = true;
        this.errorMsg = 'Passwords do not match';
      } else {
        this.load = true;
        this.showInvalidDataMsg = false;
        const payload : RegistrationPayload = {
          user_name: this.registrationForm.controls['username'].value,
          email: this.registrationForm.controls['email'].value,
          password: this.registrationForm.controls['password'].value,
          register: true
        };
        this.registerSub = this.loginService.register(payload).subscribe((res: RegistrationResponse) => {
          if(res.status === 'error') {
            this.showUserCannotBeAdded = true;
            this.errorMsg = res.message;
          } else {
            this.router.navigate(['/'], );
            this.openSnackBar(res.message + '. You can login.');
          }
          this.load = false;
        });
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss',{
      duration: 3000
    });
  }


}
