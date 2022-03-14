import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Logística parqueaderos",
    "url":"../../assets/images/preguntas_uno.png",
    // "subtitulo":"325 251 7895",
    "icon":"help-circle-outline"},

    {"titulo":"Servicios públicos",
    "url":"../../assets/images/preguntas_dos.png",
    // "subtitulo":"321 458 9874",
    "icon":"help-circle-outline"},
   
    {"titulo":"Separación de Basuras",
    "url":"../../assets/images/preguntas_uno.png",
    // "subtitulo":"321 524 8955",
    "icon":"help-circle-outline"},

    {"titulo":"Aseo",
    "url":"../../assets/images/preguntas_dos.png",
    // "subtitulo":"321 525 7895",
    "icon":"help-circle-outline"},

    {"titulo":"Seguridad",
    "url":"../../assets/images/preguntas_uno.png",
    // "subtitulo":"325 256 9856",
    "icon":"help-circle-outline"},


    {"titulo":"Administración",
    "url":"../../assets/images/preguntas_dos.png",
    // "subtitulo":"315 785 6984",
    "icon":"help-circle-outline"},

    {"titulo":"Horarios",
    // "subtitulo":"328 785 3226",
    "url":"../../assets/images/preguntas_dos.png",
    "icon":"help-circle-outline"},

    {"titulo":"Servicios",
    "url":"../../assets/images/preguntas_uno.png",
    // "subtitulo":"985 125 6587",
    "icon":"help-circle-outline"},

    {"titulo":"COVID",
    "url":"../../assets/images/preguntas_uno.png",
    // "subtitulo":"365 789 4523",
    "icon":"help-circle-outline"},

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

