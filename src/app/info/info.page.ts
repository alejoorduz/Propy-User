import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
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

  ngOnInit() {
    console.log("aja: ",this.modaly)
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
