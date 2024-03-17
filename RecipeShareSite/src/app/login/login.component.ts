import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  err: boolean = false;
  errMsg: string = "";

  constructor(private userService: UserApiService, private router: Router) { }

  login(form: NgForm): void {

    if(form.invalid) {
      return;
    }


    this.userService.login(form).subscribe({
      next: data => {
        if (data.error) {
          this.errMsg = data.error
          this.err = true;
          return;
        } else {
          this.err = false;
          this.userService.user = data;
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(["/"]);
        }
      },
      error: err => {
        console.log(err);
        console.log("log in component error");
      },
    })
  }

}
