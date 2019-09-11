import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective; // For dynamic loading. You can also pass a type into ViewChild.

  private closeSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver // For dynamic loading
              ) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable
      .subscribe(responseData => {
        // user logged in
        console.log('responseData', responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, 
      errorMessageFromService => {
        console.log('error', errorMessageFromService);
        this.errorMessage = errorMessageFromService;
        this.showErrorAlert(errorMessageFromService);
        this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }

  showErrorAlert(message: string) { // for dynamic loading
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent); // this will return a component factory that can create components of type: AlertComponent
    // We can use this factory to create an Alert Component, but we also need a place we can attatch it in our DOM, it needs a viewHandleRef.
    // We do this by creating a helper directive: PlaceholderDirective
    // We get access to this directive by putting a viewContainerRef on an ng-template 
    // in the HTML of this component, and grabbing it with @ViewChild.
    const hostViewContainerRef = this.alertHost.viewContainerRef; // viewContainerRef is exposed as a public property in the placeholderDirective
    hostViewContainerRef.clear() // clears all rendered components that have been rendered in the hostViewContainerRef before.

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    }
    );

    // will throw an error unless you add this to entryComponents in the appModule
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

}
