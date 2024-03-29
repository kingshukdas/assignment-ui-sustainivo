import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginPayload, LoginResponse, RegistrationPayload, RegistrationResponse } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userUrl = 'http://206.189.13.18/api/v1/user/index.php';
  productUrl = 'http://206.189.13.18/api/v1/product/index.php';
  uploadImgUrl = 'http://206.189.13.18/api/v1/product/upload.php';

  constructor(private http: HttpClient) { }

  login(payload: LoginPayload) {
    return this.http.post<LoginResponse>(this.userUrl,payload);
  }

  register(payload: RegistrationPayload) {
    return this.http.post<RegistrationResponse>(this.userUrl,payload);
  }

  setLoggedIn() {
    sessionStorage.setItem('login', 'true');
  }

  setLoggedOut() {
    sessionStorage.setItem('login', 'false');
  }
}
