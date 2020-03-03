import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {MatomoInjector} from 'ngx-matomo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginOrRegister = false;

  breadcrumbs: string[] = [];

  constructor(public router: Router,
              public oauthService: AuthenticationService,
              private matomoInjector: MatomoInjector) {
    this.matomoInjector.init('//dl054.madgik.di.uoa.gr/matomo/', 2);
  }

  ngOnInit() {
    this.oauthService.getUserInfo();
    this.router.events.subscribe((evt: any) => {
      if (evt.url) {
        this.breadcrumbs = evt.url.split(/\//);
      }
      this.breadcrumbs[0] = 'Home';

      // this.isLoginOrRegister = ["/signUp", "/signIn"].indexOf(evt.url) >= 0;
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
