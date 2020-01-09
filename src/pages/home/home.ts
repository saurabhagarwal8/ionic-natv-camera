import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import {Camera, CameraOptions} from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  path:string;
  pathDis:boolean;
  image;

  constructor(public navCtrl: NavController, public camera:Camera) {
    this.path="http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png";
    this.pathDis=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  takePic(){

    let options: CameraOptions = {
      quality:50,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.PNG,
      mediaType:this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(url =>{
      this.path=url;
      this.pathDis=true;
      console.log("Image Path : "+ url);
      this.path = 'data:image/png;base64,'+url;
      console.log(this.image);
    }, err =>{
      alert("Error : "+err);
    });

  }

}
