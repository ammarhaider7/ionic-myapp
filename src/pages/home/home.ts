import { BatteryStatus, BatteryStatusResponse } from '@ionic-native/battery-status';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import Tesseract from 'tesseract.js'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('ocrImage') ocrImage: ElementRef;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  base64Image: string;
  batteryLevel: number;
  isPlugged: boolean;
  pluggedInConjunction: string;
  ocrOb: any;
  imageEl: any;
  showSpinner: boolean = false;
  errorMessage: string;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private camera: Camera,
    private batteryStatus: BatteryStatus) {
  }

  addImage = () => {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = `data:image/jpeg;base64,${imageData}`;
     }, (err) => {
      // Handle error
     });
  }

  getBatteryStatus = () => {
    this.batteryStatus.onChange().subscribe(
      (status: BatteryStatusResponse) => {
        this.batteryLevel = status.level;
        this.isPlugged = status.isPlugged;
        this.pluggedInConjunction = this.isPlugged ? '' : 'not';
      }
    )
  }

  analyseImage = (myImage) => {
    this.showSpinner = true;
    Tesseract.recognize(myImage)
    .then((result) => {
      this.showSpinner = false;
      this.ocrOb = result;
    })
    .catch(err => {
      this.errorMessage = err;
    });
  }

}
