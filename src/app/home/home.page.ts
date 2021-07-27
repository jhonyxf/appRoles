import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = this.authService.getUser();

  constructor(private authService: AuthService) {}

  logout(){
    this.authService.logout();
  }
}
