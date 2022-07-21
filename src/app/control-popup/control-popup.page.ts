import { Component, OnInit, Input, NgZone} from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { normalize } from 'path';
import { FirestoreService } from '../firestore.service';
import { BotoneraPage } from "../aircall/botonera/botonera.page";
import { AccesoPage } from "../acceso/acceso.page";
import { ToastController,AlertController,ModalController } from "@ionic/angular";
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import * as moment from "moment";
import * as $ from "jquery";
import { LoadingController } from '@ionic/angular';

//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________



@Component({
  selector: 'app-control-popup',
  templateUrl: './control-popup.page.html',
  styleUrls: ['./control-popup.page.scss'],
})
export class ControlPopupPage implements OnInit {

  statusMessage: string;
  devices:any[] = [];

  constructor(private loadingController: LoadingController,private ngZone: NgZone,public alertController: AlertController,private toastCtrl: ToastController,private ble: BLE,private fbs: FirestoreService,private modalCtrl: ModalController) { }

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre

  uuid = "";

fav_floors;

show_alert;

loading: HTMLIonLoadingElement;
//
 accesos = [];
  ngOnInit() {
    this.show_alert = false;
    console.log(this.uid,this.nombre,this.proyecto)
    this.get_acceso();
    this.fav_floors = JSON.parse(localStorage.getItem("myfloors"));
    console.log("mis pisos: ", this.fav_floors)
    this.setStatus('Conectando...');
  }

  get_acceso(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/acceso").subscribe((servicios) => {
      this.accesos = [];
      servicios.forEach((datosTarea: any) => {
        this.accesos.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de accesos")
      console.log(this.accesos)
    });
}

  async modal_acceso(){
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: AccesoPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        ///apto: this.apto,
        //torre: this.tower
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

async modal_aircall(){
  this.modalCtrl.dismiss();
  const modal = await this.modalCtrl.create({
    component: BotoneraPage,
    cssClass: 'adding_modal',
    componentProps: {
      uid: this.uid,
      nombre: this.nombre,
      proyecto: this.proyecto,
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

//escaneando, buscando, conectando y enviando mensaje BLE ---------
Scan(clave,tipo){
  if(tipo === "acceso"){
    this.setStatus('Buscando acceso...');
  }
  if(tipo === "aircall"){
    this.setStatus('Buscando ascensor...');
  }
  this.devices = [];  // clear list
  this.ble.scan([], 1).subscribe(
    device => this.onDeviceDiscovered(device,clave), 
    error => this.scanError(error)
  );
  setTimeout(this.setStatus.bind(this), 1000, '');
}

onDeviceDiscovered(device,clave){
  console.log('Discovered' + JSON.stringify(device,null,2));
  this.ngZone.run(()=>{
    this.devices.push(device)
    console.log(device)
  })
  if(device.name === clave){
   // this.setStatus("se encontro el device " + clave)
    this.uuid = device.id;
  }
}

// If location permission is denied, you'll end up here
async scanError(error) {
  //this.show_alert = false;
  $(".alert").css("background-color","red");
  this.setStatus('Error ' + error);
  let toast = await this.toastCtrl.create({
    message: 'Error scanning for Bluetooth low energy devices',
    position: 'bottom',
    duration: 2000
  });
  toast.present();
}

Connected(nombre,mensaje,entrada,tipo){
  this.check_ble_configs();
  this.show_alert = true;
 // this.use_connect = localStorage.getItem("use_connect")
 // this.uuidconnect =  localStorage.getItem("uuid");
 // console.log("Abriendo ",nombre, " y esta clave ", clave)
   // this.setStatus('conexion con scan');
   // $(".buttonpad").css("background-color","#e39774")
   // $(".buttonpad").css("background-color","rgb(255, 153,81)");
   //console.log("el piso que oprimi fue: " + piso)
   this.Scan(nombre,tipo);
   setTimeout(() => {
        if(this.uuid === ""){
          this.setStatus('Intenta nuevamente');
         $(".alert").css("background-color","red");
          setTimeout(() => {
          this.setStatus('Debes estar cerca a la puerta');
          }, 1000)
        }else{
          setTimeout(() => {
          console.log('INTENTANDO CONECTAR a: ' + this.uuid);
          this.Connect(mensaje,entrada,tipo)
        }, 500)
    }
   }, 1000);
    // this.cancelado = true;
   }


Connect(mensaje,entrada,tipo){
    localStorage.setItem("use_connect","0");
    //this.setStatus('uuid: ' + this.uuid + typeof(this.uuid));
   this.setStatus('Comando en cola, enviando...');    
  //7C:9E:BD:45:52:8E  
  //a8a7e679-3a55-1702-464c-c1dc2d0dd6ea
  //A8A7E679-3A55-1702-464C-C1DC2D0DD6EA
  (<any>window).ble.connect(this.uuid, device => {
    this.setStatus('Conectado.....');
    console.log('Connected', device);
    if(tipo === "acceso"){
      this.upload_movement(entrada);
    }
      setTimeout(() => {
        this.BleWrite(mensaje,tipo);
        // this.Disconnect();
      }, 500)
  }, error => {
    //this.show_alert = false;
    console.log('Disconnected', error);
    //this.cancelado = false;
    $(".alert").css("background-color","red");
    this.setStatus('Tienes que estar cerca al ascensor');
  });
}

BleWrite(mensaje,tipo) {
  this.setStatus('¡Listo!');
   $(".alert").css("background-color","#5abb00");
              // this.setStatus('¡Puerta abierta!')
  var data = new Uint8Array(1);
  data[0] = mensaje;
  this.ble.write(
          this.uuid,
          BLE_SERVICE,
          BLE_CHARACTERISTIC,
          data.buffer
      );
      setTimeout(() => {
        this.Disconnect(tipo);
      }, 500);
}

async upload_movement(nombre){
  // const res = confirm("Estas seguro que quieres agregar esta autorización?");
  // if(res){
       var timei = new Date(Date.now());
       var ti = moment(timei).format('h:mm:ss a'); 
       var dt = moment(timei).format('DD-MM-YYYY'); 
       let comunicado = {
           nombre: this.nombre,
           puerta: nombre,
           dia: dt,
           hora: ti,
           apto: this.apto,
           torre: this.torre
       };
     var id = Math.floor(Math.random() * 3213546846468435454) + 1
     console.log("random",id)
     var sid = id.toString()
     //this.fbs.insertar("Proyectos/"+this.proyecto+"/accesshistory", sid, comunicado )
     this.fbs.insertar("Proyectos/"+this.proyecto+"/accesshistory/"+nombre+"/dias/", dt, {ultimo: ti} )
     this.fbs.insertar("Proyectos/"+this.proyecto+"/accesshistory/"+nombre+"/dias/"+dt+"/movimientos", ti, comunicado )
     $(".alert").css("background-color","yellow");
     // this.presentAlertdone();
  // }
   }

Disconnect(tipo){
  this.ble.disconnect(this.uuid).then(data => {
  this.uuid = "";
  console.log("disconnected good");
  $(".alert").css("background-color","#5abb00");
  if(tipo === "acceso"){
    this.setStatus('Bienvenid@ ' + this.nombre);
  }
  if(tipo === "aircall"){
    this.setStatus('¡Piso Marcado!');
  }
});
}

check_ble_configs(){
 this.ble.isEnabled().then(
  data => {
     // this.alert("Error","Problema con el Bluetooth","Debes tener el Bluetooth encendido")
      this.ble.isLocationEnabled().then(
          data => {
              //this.insertarpiso(piso,valor,viajenum)
              //this.setStatus('CONFIG OK')
                 },
          err => {
              console.log(err);
              this.show_alert = false;
              this.alert("Error","Problema con la ubicación","Debes tener la ubicacion prendida para utilizar BLE-ACCESS")
                 }
         );
  },
  err => {
      console.log(err);
      this.show_alert = false;
      this.alert("Error","Problema con el Bluetooth","Debes tener el Bluetooth encendido")
  }
);
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

setStatus(message) {
  console.log(message);
  this.ngZone.run(() => {
    this.statusMessage = message;
  });
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'Obteniendo datos, por favor espere...'
  });
  return this.loading.present();
}

//----------------------------

close_toast(){
  this.show_alert = false;
}

}
