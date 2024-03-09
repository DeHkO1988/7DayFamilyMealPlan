import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from './types/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  user: User | undefined;

  get isLogged(): boolean {
    console.log(this.user)
    return !!this.user
  };

  constructor(private http: HttpClient) {
    try {
      const logInUser = localStorage.getItem('user') || "";
      this.user = JSON.parse(logInUser);

    } catch (error) {
      this.user = undefined;
    }
  }

  login(email: string, password: string) {
    const { appUrl } = environment;

    const body = {
      email: email,
      password: password
    }

    return this.http.post<User>(`${appUrl}/users/login`, JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  logout() {
    this.user =undefined;
    localStorage.removeItem("user");
  }
}
