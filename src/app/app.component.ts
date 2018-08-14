import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';

import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  private app;
  private platform;
  private menu: MenuController;


  constructor(app:App, platform: Platform,
     menu: MenuController,
     statusBar: StatusBar,
     splashScreen: SplashScreen,
     private auth: AuthService) {
       this.menu = menu;
   		  this.app = app;
   		  this.platform = platform;

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.

        statusBar.styleDefault();
        splashScreen.hide();
        this.auth.afAuth.authState
         .subscribe(
           user => {
             if (user) {
               this.rootPage = HomePage;
             } else {
               this.rootPage = LoginPage;
             }
           },
           () => {
             this.rootPage = LoginPage;
           }
         );
      });
    }

  login() {
      this.menu.close();
  	  this.auth.signOut();
  	  this.rootPage = LoginPage;
  }

  logout() {
  	this.menu.close();
  	this.auth.signOut();
  	this.rootPage = LoginPage;
  }


}
