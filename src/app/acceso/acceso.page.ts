import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { ToastController,AlertController,ModalController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage implements OnInit {

  statusMessage: string;
  devices:any[] = [];

  constructor(private toastCtrl: ToastController,private ble: BLE,private ngZone: NgZone,private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
uuid;
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
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/acceso").subscribe((servicios) => {
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

  Scan(){
    this.setStatus('Escaneando Ascensor');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, '');
  }

  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
    if(device.name === 'AIRCALL SV'){
      this.uuid = device.id;
    }
  }

  // If location permission is denied, you'll end up here
  async scanError(error) {
    this.setStatus('Error ' + error);
    let toast = await this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  Connected(nombre,uid){
    this.check_ble_configs()
   // this.use_connect = localStorage.getItem("use_connect")
   // this.uuidconnect =  localStorage.getItem("uuid");
  console.log("Abriendo ",nombre," con este uid: ", uid)
      this.setStatus('conexion con scan');
      $(".buttonpad").css("background-color","#e39774")
     // $(".buttonpad").css("background-color","rgb(255, 153,81)");
     //console.log("el piso que oprimi fue: " + piso)
    // this.Scan();
     setTimeout(() => {
      console.log('INTENTANDO CONECTAR a: ' + uid);
   //   this.Connect(nombre,uid,"1")
     }, 1000)
      // this.cancelado = true;
     }

  
  Connect(nombre,uid,mensaje){
      localStorage.setItem("use_connect","0");
      //this.setStatus('uuid: ' + this.uuid + typeof(this.uuid));
     this.setStatus('Comando en cola, esperando...');    
    //7C:9E:BD:45:52:8E  
    //a8a7e679-3a55-1702-464c-c1dc2d0dd6ea
    //A8A7E679-3A55-1702-464C-C1DC2D0DD6EA
    (<any>window).ble.connect(this.uuid, device => {
      this.setStatus('Conectado.....'+this.uuid);
      console.log('Connected', device);
        setTimeout(() => {
      this.BleWrite(nombre,this.uuid,"2");
       // this.Disconnect();
       }, 500)
    }, error => {
      console.log('Disconnected', error);
      //this.cancelado = false;
      this.setStatus('Tienes que estar cerca al ascensor');
    });
  }
  
  BleWrite(nombre,uid,mensaje) {
    var data = new Uint8Array(1);
    data[0] = 1;
    this.ble.write(
            this.uuid,
            BLE_SERVICE,
            BLE_CHARACTERISTIC,
            data.buffer,
            // this.succes(),
            // this.failure()
        )
        .then(
            data => {
                debugger;   
                console.log(data);
                //this.insertarpiso(piso,valor,viajenum)
                this.setStatus('Piso Marcado!'+data+data.buffer)
                setTimeout(() => {
                  this.Disconnect(this.uuid);
                 }, 500)
            },
            err => {
                console.log(err);
                this.setStatus('Error: Intenta de nuevo');
            }
        );
  }
  
  Disconnect(uuid){
    this.ble.disconnect(uuid)
    .then(data => {
    console.log("disconnected good");
    //this.cancelado = false;
    this.setStatus('¡Listo!'); 
       setTimeout(() => {
       this.setStatus('Bienvenid@');
       }, 1000)
    
  });
  }

  check_ble_configs(){
   this.ble.isEnabled().then(
    data => {
       // this.alert("Error","Problema con el Bluetooth","Debes tener el Bluetooth encendido")
        this.ble.isLocationEnabled().then(
            data => {
                //this.insertarpiso(piso,valor,viajenum)
                this.setStatus('CONFIG OK')
                   },
            err => {
                console.log(err);
                this.alert("Error","Problema con la ubicación","Debes tener la ubicacion prendida para utilizar BLE-ACCESS")
                   }
           );
    },
    err => {
        console.log(err);
        this.alert("Error","Problema con el Bluetooth","Debes tener el Bluetooth encendido")
    }
);
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }
}
