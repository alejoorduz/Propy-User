import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import * as $ from "jquery";
import { ToastController,AlertController,ModalController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { ModalSpotPage } from "../modal-spot/modal-spot.page";

//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________
@Component({
  selector: 'app-lista-spots',
  templateUrl: './lista-spots.page.html',
  styleUrls: ['./lista-spots.page.scss'],
})
export class ListaSpotsPage implements OnInit {

  statusMessage: string;
  devices:any[] = [];

  constructor(private toastCtrl: ToastController,private ble: BLE,private ngZone: NgZone,private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() torre
  @Input() apto
  @Input() fecha
  
dias: any = {
    id: "",
    data: {}
};

uuid = "";

  tarjeteros = [];

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto,this.fecha)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("Proyectos/"+this.proyecto+"/parking/"+this.fecha+"/spots").subscribe((servicios) => {
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


  async modal_table(propietario,torre_prop,apto_prop,spot,inicial,final){
    console.log(propietario,torre_prop,apto_prop,inicial,final)
    const modal = await this.modalCtrl.create({
      component: ModalSpotPage,
      cssClass: 'spot_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        torre: this.torre,
        apto: this.apto,
        fecha: this.fecha,
        propietario: propietario,
        prop_torre: torre_prop,
        prop_apto: apto_prop,
        spot: spot,
        hora_inicial: inicial,
        hora_final: final
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

