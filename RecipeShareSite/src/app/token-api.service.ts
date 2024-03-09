import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root'
})
export class TokenApiService {

  constructor(private http: HttpClient, private userService: UserApiService) { }

  user = this.userService.userInfo();

  create(title: string, readyIn: string, ingredients: string, serves: string, image: string, description: string) {
    const { appUrl } = environment;

    const body = {
      title,
      readyIn,
      ingredients,
      serves,
      image,
      description,
      owner: this.user?._id,
    }

    return this.http.post<Recipe>(`${appUrl}/creatures/create`, JSON.stringify({ ...body, token: this.user?.token }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }



}
