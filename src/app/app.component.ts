import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    private network: Network,
    private alertCtrl: AlertController,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.show();
      this.listenToNetworkConnect();
      this.listenToNetworkDisconnect();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // Hide splashscreen after 1 second to test splash screen
      setTimeout(() => splashScreen.hide(), 2000);
    });
  }

  listenToNetworkConnect() {
    this.network.onConnect().subscribe(() => {
      this.presentAlert('Network change', 'Network connected!');
    });
  }

  listenToNetworkDisconnect() {
    this.network.onDisconnect().subscribe(() => {
      this.presentAlert('Network change', 'Network was disconnected :-(');
    });
  }

  presentAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}

