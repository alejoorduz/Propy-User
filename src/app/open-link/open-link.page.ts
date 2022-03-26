import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Platform } from '@ionic/angular';
//import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})


@Component({
  selector: 'app-open-link',
  templateUrl: './open-link.page.html',
  styleUrls: ['./open-link.page.scss'],
  providers: [File,DocumentViewer]
})
export class OpenLinkPage implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private file: File, 
    private ft: FileTransfer,
    private fileOpener: FileOpener, 
    private document: DocumentViewer,
    private fbs: FirestoreService,
   // private iab: InAppBrowser,
    private modalCtrl: ModalController ,
    public alertController: AlertController) { }
    
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() url
  @Input() modaly

  show: boolean;
 
  comunicados  = [
    {"titulo":"Entrada principal",
    // "subtitulo":"Decreto 148",
    "icon":"wifi-outline",
    // "fecha":"28/02/2022"
  },
 
    {"titulo":"Torre 1",
    // "subtitulo":"Calleja B4",
    "icon":"wifi-outline",
    // "fecha":"15/01/2022"
  },

    {"titulo":"Torre 2",
    // "subtitulo":"Aviso importante",
    "icon":"wifi-outline",
    // "fecha":"31/11/2021"
  },

    {"titulo":"Portón",
    // "subtitulo":"Reunion Anual",
    "icon":"wifi-outline",
    // "fecha":"12/10/2021"
  },

    {"titulo":"Puerta Sótano",
    // "subtitulo":"Información",
    "icon":"wifi-outline",
    // "fecha":"18/08/2021"
  },

  ]

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  ngOnInit() {
    console.log("url: ",this.url)
    // const browser = this.iab.create(this.url,'_self',{location:'no'});
  // this.document.viewDocument('assets/MyPdf.pdf', 'application/pdf', this.options)
   // this.get_comunicados();
   if (this.modaly === "clasificados") {
     this.show = true;
   }else{
     this.show = false;
   }
  }

//   get_comunicados(){
//     this.fbs.consultar("/Proyectos/"+this.proyecto+"/comunicados").subscribe((servicios) => {
//       this.comunicados = [];
//       servicios.forEach((datosTarea: any) => {
//         this.comunicados.push({
//           id: datosTarea.payload.doc.id,
//           data: datosTarea.payload.doc.data()
//         });
//       })
//       //this.password = this.lista_proyectos.data.key
//       console.log("traigamos la lista de comunicados")
//       console.log(this.comunicados)
//     });
// }

openLocalPdf() {
 let filePath = this.file.applicationDirectory + 'www/assets';
  if (this.platform.is('android')) {
    $("#bot").css("background-color","red")
    let fakeName = Date.now();
    this.file.copyFile(filePath, 'MyPdf.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
     this.fileOpener.open ( result.nativeURL, 'application/pdf');
    });
   } else {
    $("#bot").css("background-color","blue")
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
   this.document.viewDocument (`${filePath}/MyPdf.pdf`, 'application/pdf', options);
}
}

downloadAndOpenPdf() {
  let downloadUrl = this.url;
 let path = this.file.dataDirectory;
 const transfer = this.ft.create();      
 transfer.download (downloadUrl, `${path}myfile.pdf`).then(entry => {
    let url = entry.toURL();
    if (this.platform.is('ios')) {
     this.document.viewDocument(url, 'application/pdf', {});
     } else {
      this.fileOpener.open(url, 'application/pdf');
    }
  });
}

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!',
      subHeader: 'Formulario enviado con exito',
      message: 'Gracias por tus sugerencias.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
