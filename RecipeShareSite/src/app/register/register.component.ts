import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserApiService, private router: Router) { }

  register(username: string, email: string, password: string, repeatPassword: string): void {

    this.userService.register(username, email, password, repeatPassword).subscribe({
      next: data => {
        if (data.error) {
          return
        } else {
          this.userService.user = data;
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(["/"]);
        }
      },
      error: err => {
        console.log(err);
        console.log("register component error");
      }
    });

  }

}
