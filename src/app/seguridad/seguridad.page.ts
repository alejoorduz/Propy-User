import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 



  comunicados  = [
    
   {"titulo":"Car",
    "url":"../../assets/images/park.png",
    // "subtitulo":"321 525 7895",
    "icon":"car-sport-outline"},

    {"titulo":"DoorMan",
    "url":"../../assets/images/celaduria.png",
    // "subtitulo":"325 251 7895",
    "icon":"person-outline"},

    {"titulo":"Movement Sensor",
    "url":"../../assets/images/sensores.png",
    // "subtitulo":"321 458 9874",
    "icon":"business-outline"},

    {"titulo":"Cameras",
    "url":"../../assets/images/sec_cam.png",
    // "subtitulo":"321 524 8955",
    "icon":"videocam-outline"},
  
  ]

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
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

  llamar(number){
  //   console.log("Entre a la llamada de emergencia")
  //   this.callNumber.callNumber(number, true)
  //  .then(res => console.log('Launched dialer!', res))
  //   .catch(err => console.log('Error launching dialer', err));
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
        url: url
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

