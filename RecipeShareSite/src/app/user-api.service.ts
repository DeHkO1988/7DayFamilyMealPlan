import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from './types/user';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  user: User | undefined;

  get isLogged(): boolean {
    return !!this.user
  };

  userInfo<User>() {
    return this.user;
  };

  constructor(private http: HttpClient) {
    try {
      const logInUser = localStorage.getItem('user') || "";
      this.user = JSON.parse(logInUser);

    } catch (error) {
      this.user = undefined;
    }
  };

  login(form: NgForm) {
    const { appUrl } = environment;

    const body = {
      email: form.value.email,
      password: form.value.password
    }

    return this.http.post<User>(`${appUrl}/users/login`, JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  };

  logout() {
    this.user = undefined;
    localStorage.removeItem("user");
  };

  register(form: NgForm) {
    
    const { appUrl } = environment;

    const body = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      repeatPassword: form.value.repeatPassword
    }

    return this.http.post<User>(`${appUrl}/users/register`, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
