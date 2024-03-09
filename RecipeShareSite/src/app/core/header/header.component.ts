import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/user-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserApiService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["/login"]);
  }
}
