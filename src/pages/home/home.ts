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
  files:File;
  files2:File;

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
      //console.log("Image Path : "+ url);
      this.path = 'data:image/png;base64,'+url;
      console.log(this.path);

      fetch(this.path)
        .then(res => res.blob())
        .then(blob => {
          this.files = new File([blob], "File name",{ type: "image/png" })
          console.log(this.files);
      })

      this.urltoFile(this.path, 'image.jpeg','image/jpeg').then(val=>{
        this.files2=val;
        console.log(this.files2);
      })

    }, err =>{
      alert("Error : "+err);
    });

  }

   urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}

}
