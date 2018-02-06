import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private network: Network,
    private alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation,
    private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.show();
      this.reportConnectivity();
      this.listenToNetworkConnect();
      this.listenToNetworkDisconnect();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // Hide splashscreen after 1 second to test splash screen
      // set to landscape only when running on cordova
      console.log(this.platform.is('cordova '));
      if (this.platform.is('cordova ')) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      
      setTimeout(() => splashScreen.hide(), 2000);
    });
  }

  reportConnectivity() {
    this.presentAlert('Network status', this.network.type);
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

