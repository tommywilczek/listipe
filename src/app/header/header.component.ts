import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;
  collapsed = true;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false: true; // same as !!user
      console.log('!user', !user);
      console.log('!!user', !!user);
    }
    );
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/auth'])
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
