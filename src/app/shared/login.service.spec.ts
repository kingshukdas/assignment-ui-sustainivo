import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should login`, waitForAsync(inject([HttpTestingController, LoginService],
    (httpClient: HttpTestingController, service: LoginService) => {
      const loggedIn = {
        "status": "success",
        "message": "Login successful",
        "data": {
        "user_id": 2,
        "email": "test@email.com",
        "user_name": "Dummy Name"
        }
      };

      const loginPayload = {
          "login":true,
          "email":"test@email.com",
          "password":"12345"
      }

      service.login(loginPayload)
        .subscribe((res: any) => {
          expect(res.status).toBe('success');
        });
        let req = httpMock.expectOne(service.userUrl);
        expect(req.request.method).toBe("POST");
        req.flush(loggedIn);
        httpMock.verify();
    })));

  it(`should register`, waitForAsync(inject([HttpTestingController, LoginService],
    (httpClient: HttpTestingController, service: LoginService) => {
      const registered = {
        "status": "success",
        "message": "Registration successful"
        };

      const registerPayload = {
        "register":true,
        "email":"test1ff@email.com",
        "password":"12345",
        "user_name":"Dummy Name"
        };

      service.register(registerPayload)
        .subscribe((res: any) => {
          expect(res.status).toBe('success');
        });
        let req = httpMock.expectOne(service.userUrl);
        expect(req.request.method).toBe("POST");
        req.flush(registered);
        httpMock.verify();
    })));

    it('setLoggedIn should set session storage as true', () => {
      service.setLoggedIn();
      expect(sessionStorage.getItem('login')).toBe("true");
    });

    it('setLoggedOut should set session storage as false', () => {
      service.setLoggedOut();
      expect(sessionStorage.getItem('login')).toBe("false");
    });
});
