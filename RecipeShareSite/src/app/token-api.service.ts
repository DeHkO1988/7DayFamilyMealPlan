import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
import { User } from './types/user';

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

    // console.log(this.user);
    // console.log(body)

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

  getOne(id: string) {

    const { appUrl } = environment;

    return this.http.get<Recipe>(`${appUrl}/creatures/${id}/details`);

  }

  delete(id: string, user: User | undefined) {
    const { appUrl } = environment;

    return this.http.get(`${appUrl}/creatures/${id}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        // 'owner': JSON.stringify(this.user?._id),
        'owner': JSON.stringify(user?._id),
        'userToken': JSON.stringify(user?.token)
      }
    })
  }

  update(title: string, readyIn: string, ingredients: string, serves: string, image: string, description: string, recipeId: string) {

    const { appUrl } = environment;

    this.user = this.userService.userInfo();

    const body = {
      title,
      readyIn,
      ingredients,
      serves,
      image,
      description,
      // ownerUsername: this.user?.username,
      // owner: this.user?._id,
    }

    return this.http.post<Recipe>(`${appUrl}/creatures/${recipeId}/edit`, JSON.stringify({...body, token: this.user?.token, userId: this.user?._id}), {
      headers: {
        'Content-Type': 'application/json',
      }
    })


  }



}
