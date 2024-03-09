import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  err: boolean = false;
  errMsg: string = "";

  constructor(private userService: UserApiService, private router: Router) { }

  login(email: string, password: string): void {

    this.userService.login(email, password).subscribe({
      next: data => {
        if (data.error) {
          this.errMsg = data.error
          this.err = true;
          return;
        } else {
          this.err = false;
          this.userService.user = data;
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(["/"])
        }
      },
      error: err => {
        console.log(err);
        console.log("log in component error");
      },
    })
  }

}
