import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { LoginComponent } from './login.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loginResponseMock } from '../shared/mocks.';
import { of } from 'rxjs';
import { LoginService } from '../shared/login.service';

const loginStub = {
  login() {
    return of(loginResponseMock)
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [provideAnimations(),
        {
          provide: LoginService, useValue: loginStub
        }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit login data error', () => {
    component.submit();
    expect(component.errorMsg).toBeDefined();
    expect(component.showInvalidCredsMsg).toBeTrue();
  });

  it('should submit login data error', () => {
    component.ngOnInit();
    component.loginForm.setValue({
      email: 'testcom',
      password: '123'
    });
    component.submit();
    expect(component.errorMsg).toBeDefined();
    expect(component.showInvalidCredsMsg).toBeTrue();
  });

  it('should submit valid login data', () => {
    component.loginForm.setValue({
      email: 'test@email.com',
      password: '12345'
    });
    component.submit();
    setTimeout(() => {
      expect(component.showInvalidCredsMsg).toBeFalse();
      expect(spyOn(loginStub, 'login').and.callThrough()).toHaveBeenCalled();
    },2000)

  })
});
