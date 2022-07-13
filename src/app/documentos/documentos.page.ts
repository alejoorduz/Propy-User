import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { Observable } from 'rxjs';
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
  providers: [File,DocumentViewer]
})
export class DocumentosPage implements OnInit {

  constructor(private platform: Platform,
    private file: File, 
    private ft: FileTransfer,
    private fileOpener: FileOpener, 
    private document: DocumentViewer,
    private db: AngularFirestore,
    private storage: AngularFireStorage, 
    private loadingController: LoadingController,
    private modalCtrl: ModalController ,
    public alertController: AlertController) {

     }
  
  @Input() uid
  @Input() nombre
  @Input() proyecto

  location = 'uploads/';
  items: Observable<any[]>;

  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;
 
  comunicados  = [
    {"titulo":"Lineamientos COVID",
    "subtitulo":"Decreto 148",
    "icon":"document-attach-outline",
    "fecha":"28/02/2022"},

    {"titulo":"Normas de convivencia",
    "subtitulo":"Calleja B4",
    "icon":"document-attach-outline",
    "fecha":"15/01/2022"},

    {"titulo":"Aministración",
    "subtitulo":"Aviso importante",
    "icon":"document-attach-outline",
    "fecha":"31/11/2021"},

    {"titulo":"Asamblea Diciembre",
    "subtitulo":"Reunion Anual",
    "icon":"document-attach-outline",
    "fecha":"12/10/2021"},

    {"titulo":"Celaduria",
    "subtitulo":"Información",
    "icon":"document-attach-outline",
    "fecha":"18/08/2021"},
  ]

chooseFile (event) {
  this.selectedFile = event.target.files
}

addTodo(){
  this.itemsRef.add({
    title: this.newTodo
  })
  .then(async resp => {

    const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

    this.itemsRef.doc(resp.id).update({
      id: resp.id,
      imageUrl: imageUrl || null
    })
  }).catch(error => {
    console.log(error);
  })
}

async uploadFile(id, file): Promise<any> {
  if(file && file.length) {
    try {
      await this.presentLoading();
      const task = await this.storage.ref(this.proyecto+'/documentos').child(id).put(file[0])
      this.loading.dismiss();
      $('#name').val("");
      return this.storage.ref(this.proyecto+`/documentos/${id}`).getDownloadURL().toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}

async downloadAndOpenPdf(urly){
  await this.presentLoading();
  let downloadUrl = urly;
 let path = this.file.dataDirectory;
 const transfer = this.ft.create();      
 transfer.download (downloadUrl, `${path}myfile.pdf`).then(entry => {
    let url = entry.toURL();
    this.loading.dismiss();
    if (this.platform.is('ios')) {
     this.document.viewDocument(url, 'application/pdf', {});
     } else {
      this.fileOpener.open(url, 'application/pdf');
    }
  });
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'Abriendo...'
  });
  return this.loading.present();
}



remove(item){
  console.log(item);
  if(item.imageUrl) {
    this.storage.ref(`images/${item.id}`).delete()
  }
  this.itemsRef.doc(item.id).delete()
}

 async store_image(imageData: any){
    try{
      const imageName = "imagen.jpg";
      return new Promise((resolve,rejects)=>{
        const pictureRef = this.storage.ref(this.location+imageName);
        pictureRef.put(imageData).then(function(){
            pictureRef.getDownloadURL().subscribe((url:any)=>{
              resolve(url);
            })
        })
      });
    }catch(e){
      console.log('error',e)
    }
  }

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto);
    this.itemsRef = this.db.collection('Proyectos/'+this.proyecto+'/documentos')
    this.items = this.itemsRef.valueChanges();
    console.log("items",this.items)
   // this.get_comunicados();
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

  async modal_info(urly){
    const modal = await this.modalCtrl.create({
      component: InfoPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        url: urly
        //reserva: this.reserva
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("esta es la data que devuelve el modal")
      console.log(data)
      var closing = data['data'];
      if (closing) {
        this.modalCtrl.dismiss()
      }else{
        console.log("no me cierro")
      } 
  });
    return await modal.present();
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }



}
