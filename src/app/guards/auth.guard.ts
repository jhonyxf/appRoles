import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { take, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService, private alertCtrl: AlertController){

  }
  
  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole = route.data?.role ||  null;

    return this.authService.getUser().pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1),
      map(user => {   
             
        if (!user) {
          this.showAlert();
          return this.router.parseUrl('/')
        } else {
          let role = user['role'];
 
          if (!expectedRole || expectedRole == role) {
            return true;
          } else {
            this.showAlert();
            return false;
          }
        }
      })
    )
  }
  
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit that page!',
      buttons: ['OK']
    });
    alert.present();
  }
}
