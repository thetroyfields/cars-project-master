import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;
  isLoggedIn = false;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isLoggedIn = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
