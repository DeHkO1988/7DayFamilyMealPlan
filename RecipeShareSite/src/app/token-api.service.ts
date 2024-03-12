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

    this.user = this.userService.userInfo();

    const body = {
      title,
      readyIn,
      ingredients,
      serves,
      image,
      description,
      ownerUsername: this.user?.username,
      owner: this.user?._id,
    }

    console.log(this.user);
    console.log(body)

    return this.http.post<Recipe>(`${appUrl}/creatures/create`, JSON.stringify({ ...body, token: this.user?.token }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  getAll() {

    const { appUrl } = environment;

    return this.http.get<Recipe[]>(`${appUrl}/creatures/allCreatures`);

  }

  getOne(id:string) {

    const { appUrl } = environment;

    return this.http.get<Recipe>(`${appUrl}/creatures/${id}/details`);
     
  }



}
