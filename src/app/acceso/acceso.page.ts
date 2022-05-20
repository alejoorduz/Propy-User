import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';


@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Main Entrance",
    // "subtitulo":"Decreto 148",
    "icon":"wifi-outline",
    // "fecha":"28/02/2022"
  },

   {"titulo":"GYM",
    // "subtitulo":"Aviso importante",
    "icon":"wifi-outline",
    // "fecha":"31/11/2021"
  },
 
    {"titulo":"Car Door",
    // "subtitulo":"Calleja B4",
    "icon":"wifi-outline",
    // "fecha":"15/01/2022"
  },

    {"titulo":"Door 2",
    // "subtitulo":"Reunion Anual",
    "icon":"wifi-outline",
    // "fecha":"12/10/2021"
  }

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
    // const alert = await this.alertController.create({
    //   cssClass: 'my-custom-class',
    //   header: 'Listo!',
    //   subHeader: 'Se concedio el acceso',
    //   message: 'Gracias.',
    //   buttons: ['OK']
    // });
  
    // await alert.present();
  
    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }



}
