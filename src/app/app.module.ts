import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Network } from '@ionic-native/network';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MediaCapture, MediaFile, CaptureAudioOptions, CaptureError } from '@ionic-native/media-capture';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    BatteryStatus,
    ScreenOrientation,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
