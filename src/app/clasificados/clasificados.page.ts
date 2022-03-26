import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.page.html',
  styleUrls: ['./clasificados.page.scss'],
})
export class ClasificadosPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private db: AngularFirestore,
    private storage: AngularFireStorage, 
    private fbs: FirestoreService,
    private modalCtrl: ModalController,
    public alertController: AlertController) { 

    }

  location = 'uploads/';
  items: Observable<any[]>;

  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Dr. Arturo Orduz",
    "subtitulo":"Consultas de Veterinaria",
    "icon":"image-outline",
    "url":"../../assets/images/vet.png",
    "fecha":"28/02/2022"},

    {"titulo":"Pets World",
    "subtitulo":"Servicios de Veterinaria",
    "icon":"image-outline",
    "url":"../../assets/images/vet.png",
    "fecha":"15/01/2022"},

    {"titulo":"Wash Lavanderia",
    "subtitulo":"Recogemos y llevamos tu ropa lista a domicilio",
    "icon":"image-outline",
    "url":"../../assets/images/lavanderia.png",
    "fecha":"31/11/2021"},

    {"titulo":"FarmaciTodo",
    "subtitulo":"Envio gratuito para usuarios Propy",
    "icon":"image-outline",
    "url":"../../assets/images/farmacia.png",
    "fecha":"12/10/2021"},

    {"titulo":"Panaderia 153",
    "subtitulo":"Domicilios 24/7 ",
    "icon":"image-outline",
    "url":"../../assets/images/panaderia.png",
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
        const task = await this.storage.ref(this.proyecto+'/clasificados').child(id).put(file[0])
        this.loading.dismiss();
        $('#name').val("");
        return this.storage.ref(this.proyecto+`/clasificados/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
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
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
    this.itemsRef = this.db.collection('Proyectos/'+this.proyecto+'/clasificados')
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

  dismiss(){
    this.modalCtrl.dismiss();
  }

  async modal_info(url){
    const modal = await this.modalCtrl.create({
      component: InfoPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        url: url,
        modaly: "clasificados"
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



}
