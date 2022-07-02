import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import * as $ from "jquery";
import { ToastController,AlertController,ModalController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import * as moment from "moment";

//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________


@Component({
  selector: 'app-mis-spots',
  templateUrl: './mis-spots.page.html',
  styleUrls: ['./mis-spots.page.scss'],
})
export class MisSpotsPage implements OnInit {


  statusMessage: string;
  devices:any[] = [];

  constructor(private toastCtrl: ToastController,private ble: BLE,private ngZone: NgZone,private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre
 
uuid = "";
  //test in aircall :  a8a7e679-3a55-1702-464c-c1dc2d0dd6ea
  // comunicados  = [
  //   {"titulo":"Main Entrance",
  //   // "subtitulo":"Decreto 148",
  //   "icon":"wifi-outline",
  //   // "fecha":"28/02/2022"
  // },

  //  {"titulo":"GYM",
  //   // "subtitulo":"Aviso importante",
  //   "icon":"wifi-outline",
  //   // "fecha":"31/11/2021"
  // },
 
  //   {"titulo":"Car Door",
  //   // "subtitulo":"Calleja B4",
  //   "icon":"wifi-outline",
  //   // "fecha":"15/01/2022"
  // },

  //   {"titulo":"Door 2",
  //   // "subtitulo":"Reunion Anual",
  //   "icon":"wifi-outline",
  //   // "fecha":"12/10/2021"
  // }

  // ]

  tarjeteros = [];

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("user/"+this.uid+"/proyectos/"+this.proyecto+"/spots/").subscribe((servicios) => {
      this.tarjeteros = [];
      servicios.forEach((datosTarea: any) => {
        this.tarjeteros.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.tarjeteros)
    });
}

delete(comunicado,fecha){
  const res = confirm("¿Estás seguro que quieres eliminar este SPOT?");
  if(res){
      this.fbs.delete_doc("Proyectos/"+this.proyecto+"/parking/"+fecha+"/spots/", comunicado).then(() => {
      })
      this.fbs.delete_doc("user/"+this.uid+"/proyectos/"+this.proyecto+"/spots/", comunicado).then(() => {
      })
  }
}

  async alert(header,subHeader,message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
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

