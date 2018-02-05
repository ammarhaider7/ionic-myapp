import { BatteryStatus, BatteryStatusResponse } from '@ionic-native/battery-status';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('ocrImage') ocrImage: ElementRef;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    minWidth: 2,
    canvasWidth: 400,
    canvasHeight: 200,
    backgroundColor: '#f6fbff',
    penColor: '#666a73'
  };
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
  ocrText: string;
  signature: string;
  isDrawing: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController,
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

  drawComplete() {
    this.isDrawing = false;
  }
 
  drawStart() {
    this.isDrawing = true;
  }

  analyse() {
    this.showSpinner = true;
    (<any>window).OCRAD(this.ocrImage.nativeElement, text => {
      this.showSpinner = false;
      console.log(text);
      this.ocrText = text;
    });
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.signaturePad.clear();
    const alert = this.alertCtrl.create({
      title: 'New Signature saved.'
    });
    alert.present();
  }
 
  clearPad() {
    this.signaturePad.clear();
  }

}
