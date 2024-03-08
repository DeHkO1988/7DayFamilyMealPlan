import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserApiService) { }

  login(): void { 
    this.userService.login().subscribe(data => {
      console.log(data)
    })
  }

}
