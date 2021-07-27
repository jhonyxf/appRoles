import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const { Storage } = Plugins;

const TOKEN_KEY = 'user-token';

export interface User {
  name: string;
  role: string;
  permissions: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router) { 
    this.loadUser();
  }

  loadUser() {
    // Normally load e.g. JWT at this point
    Storage.get({ key: TOKEN_KEY }).then(res => {
      if (res.value) {
        this.currentUser.next(JSON.parse(res.value));
      } else {
        this.currentUser.next(false);
      }
    });
  }

  signIn(name) {
    // Local Dummy check, usually server request!
    let userObj: User;
 
    if (name === 'user') {
      userObj = {
        name: 'Tony Test',
        role: 'USER',
        permissions: ['read']
      };
    } else if (name === 'admin') {
      userObj = {
        name: 'Adam Admin',
        role: 'ADMIN',
        permissions: ['read', 'write']
      };
    }
    console.log("userObje: ",userObj);
    return of(userObj).pipe(
      tap(user => {
        console.log("useuser: ",user);
        // Store the user or token
        Storage.set({ key: TOKEN_KEY, value: JSON.stringify(user) })
        console.log("current user: ",this.currentUser);
        this.currentUser.next(user);
        console.log("current user depois: ",this.currentUser);
      })
    );
  }
 
  // Access the current user
  getUser() {
    return this.currentUser.asObservable();
  }
 
  // Remove all information of the previous user
  async logout() {
    await Storage.remove({ key: TOKEN_KEY });
    this.currentUser.next(false);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
 
  // Check if a user has a certain permission
  hasPermission(permissions: string[]): boolean {
    for (const permission of permissions) {
      if (!this.currentUser.value || !this.currentUser.value.permissions.includes(permission)) {
        return false;
      }
    }
    return true;
  }
}