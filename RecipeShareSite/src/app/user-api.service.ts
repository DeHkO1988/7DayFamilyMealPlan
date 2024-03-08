import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  login() {
    const { appUrl } = environment;

    const body = {
      email: "denis_vr@abv.bg",
      password: "123456"
    }

    
    return this.http.post(`http://localhost:3000/users/login`, body,
     {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
