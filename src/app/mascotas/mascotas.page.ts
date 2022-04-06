import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { LoadingController } from '@ionic/angular';
import * as moment from "moment";


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage implements OnInit {

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
  itemsUser: Observable<any[]>;

  name: string = '';
  apto: string = '';
  especie: string = '';
  raza: string = '';

  itemsRef: AngularFirestoreCollection;
  itemsRefUser: AngularFirestoreCollection;

  selectedFile: any;
  loading: HTMLIonLoadingElement;

  @Input() uid
  @Input() nombre
  @Input() proyecto
 

  chooseFile (event) {
    this.selectedFile = event.target.files
  }
  
 async addTodoUser(){
    await this.presentLoading();
    this.itemsRefUser.add({
      nombre: this.name,
      apto: this.apto,
      especie: this.especie,
      raza: this.raza
    })
    .then(async resp => {
      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)
      this.itemsRefUser.doc(resp.id).update({
        id: resp.id,
        imageUrl: imageUrl || null
      })
      this.addTodo();
    }).catch(error => {
      console.log(error);
    })
  }

 async addTodo(){
    this.itemsRef.add({
      nombre: this.name,
      apto: this.apto,
      especie: this.especie,
      raza: this.raza
    })
    .then(async resp => {
      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)
      this.itemsRef.doc(resp.id).update({
        id: resp.id,
        imageUrl: imageUrl || null
      })
      $('#nombre').val("");
      $('#apto').val("");
      $('#especie').val("");
      $('#raza').val("");
      $('#foto').val("");
      this.loading.dismiss();
     // this.addMyPet(resp.id,imageUrl);
    }).catch(error => {
      console.log(error);
    })
  }
  
  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        
        const task = await this.storage.ref(this.proyecto+'/mascotas').child(id).put(file[0])
        
        $('#name').val("");
        return this.storage.ref(this.proyecto+`/mascotas/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Porfavor espere...'
    });
    return this.loading.present();
  }
  
  remove(item){
    console.log(item);
    this.itemsRef.doc(item.id).delete()
    this.itemsRefUser.doc(item.id).delete()
    if(item.imageUrl) {
      this.storage.ref(this.proyecto+`/mascotas/${item.id}`).delete()
    }
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
    this.itemsRef = this.db.collection('Proyectos/'+this.proyecto+'/mascotas')
    this.itemsRefUser = this.db.collection('user/'+this.uid+'/proyectos/'+this.proyecto+'/mascotas')
    this.items = this.itemsRef.valueChanges();
    this.itemsUser = this.itemsRefUser.valueChanges();
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



// get_comunicados(){
//   this.fbs.consultar("/user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas").subscribe((servicios) => {
//     this.comunicados = [];
//     servicios.forEach((datosTarea: any) => {
//       this.comunicados.push({
//         id: datosTarea.payload.doc.id,
//         data: datosTarea.payload.doc.data()
//       });
//     })
//     //this.password = this.lista_proyectos.data.key
//     console.log("traigamos la lista de comunicados")
//     console.log(this.comunicados)
//   });
// }

// upload_publication(){
//   if ($("#apto").val() == "" || $("#nombre").val() == "" || $("#especie").val() == "" || $("#raza").val() == "") {
//     this.presentAlert("Debes rellenar todos los espacios")
//   } else {
//      var timei = new Date(Date.now());
//   var ti = moment(timei).format('h:mm:ss a'); 
//   var dt = moment(timei).format('DD-MM-YYYY'); 
//   let comunicado = {
//     dueno: this.nombre,
//     apto: this.apto,
//     nombre: this.nombres,
//     especie: this.especie,
//     raza: this.raza,
//     dia: dt,
//     hora: ti
//   };
//   var id = Math.floor(Math.random() * 3213546846468435454) + 1
//   console.log("random",id)
//   var sid = id.toString()
//   this.firestoreService.insertar("Proyectos/"+this.proyecto+"/mascotas/", sid, comunicado )
//   this.firestoreService.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas/", sid, comunicado )
//   $("#apto").val("")
//   $("#nombres").val("")
//   $("#especie").val("")
//   $("#raza").val("")
//   this.presentAlertdone();
//   }
// }

// async presentAlert(mensaje) {
//   const alert = await this.alertController.create({
//     cssClass: 'my-custom-class',
//     header: 'Error',
//     subHeader: 'Verifica el error',
//     message: mensaje,
//     buttons: ['OK']
//   });

//   await alert.present();

//   const { role } = await alert.onDidDismiss();
//   console.log('onDidDismiss resolved with role', role);
// }


// delete(comunicado){
//   //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
//   this.fbs.delete_doc("Proyectos/"+this.proyecto+"/mascotas", comunicado).then(() => {
//   })

//   this.fbs.delete_doc("/user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas", comunicado).then(() => {
//   })

//   // this.fbs.delete_doc("Admins/"+this.current_user_uid+"/proyectos",proyecto).then(() => {
//   //   // Actualizar la lista completa
//   //   this.consultar_lista_servicios();
//   //   // Limpiar datos de pantalla
//   //   //this.tareaEditando = {} as Tarea;
//   // })
  
// }