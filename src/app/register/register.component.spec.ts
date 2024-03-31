import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule],
      providers: [provideAnimations()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit with error', () => {
    component.submit();
    expect(component.showInvalidDataMsg).toBeTrue();
  });

  it('should submit with error', () => {
    component.ngOnInit();
    component.registrationForm.setValue({
      username: 'camelot456',
      email: 'gagga',
      password: 'qwert',
      repassword: 'qwert'
    });
    component.submit();
    expect(component.registrationForm.valid).toBeFalse();
  });

  it('should submit with password missmatch error', () => {
    component.ngOnInit();
    component.registrationForm.setValue({
      username: 'camelot456',
      email: 'gagg@uua',
      password: 'qwert',
      repassword: 'qwerty'
    });
    component.submit();
    expect(component.registrationForm.controls['repassword'].valid).toBeFalse();
  });

  it('should submit with correct data', () => {
    component.ngOnInit();
    component.registrationForm.setValue({
      username: 'camelot456',
      email: 'gagg@uua',
      password: 'qwerty',
      repassword: 'qwerty'
    });
    component.submit();
    expect(component.registrationForm.valid).toBeTrue();
  });
});
