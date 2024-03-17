import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserApiService, private router: Router) { }

  register(form: NgForm): void {

    if (form.invalid) {
      return;
    };


    this.userService.register(form).subscribe({
      next: data => {
        if (data.error) {
          console.log(data.error);
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
