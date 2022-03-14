import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {

  constructor(private fbs: FirestoreService,private callNumber: CallNumber,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Porteria",
    "subtitulo":"325 251 7895",
    "icon":"call-outline"},
  
    {"titulo":"Administración",
    "subtitulo":"321 458 9874",
    "icon":"call-outline"},
   
    {"titulo":"DirecTv",
    "subtitulo":"321 524 8955",
    "icon":"call-outline"},

    {"titulo":"Vanti",
    "subtitulo":"321 525 7895",
    "icon":"call-outline"},

    {"titulo":"ETB",
    "subtitulo":"325 256 9856",
    "icon":"call-outline"},


    {"titulo":"Movistar",
    "subtitulo":"315 785 6984",
    "icon":"call-outline"},

    {"titulo":"Dominoes Pizza",
    "subtitulo":"328 785 3226",
    "icon":"call-outline"},

    {"titulo":"TIGO",
    "subtitulo":"985 125 6587",
    "icon":"call-outline"},

    {"titulo":"Cruz Verde",
    "subtitulo":"365 789 4523",
    "icon":"call-outline"},

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
    console.log("Entre a la llamada de emergencia")
    this.callNumber.callNumber(number, true)
   .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

  dismiss(){
    this.modalCtrl.dismiss();
  }



}

