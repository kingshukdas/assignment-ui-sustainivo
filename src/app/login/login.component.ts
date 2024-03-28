import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ SharedModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  submit() {}
}
