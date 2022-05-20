import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-citofonia',
  templateUrl: './citofonia.page.html',
  styleUrls: ['./citofonia.page.scss'],
})
export class CitofoniaPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Llamada porteria",
     "subtitulo":"01/03/2022 - 06:30 am",
    "icon":"barcode-outline"},

    {"titulo":"Llamada porteria",
    "subtitulo":"28/02/2022 - 09:34 pm",
    "icon":"barcode-outline"},
   
    {"titulo":"Llamada puerta principal",
    "subtitulo":"28/02/2022 - 05:40 pm",
    "icon":"barcode-outline"},

    {"titulo":"Llamada porteria",
    "subtitulo":"27/02/2022 - 09:20 am",
    "icon":"barcode-outline"}
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



}

