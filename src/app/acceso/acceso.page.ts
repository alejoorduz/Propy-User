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

  async open_door() {
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
    if(device.name === 'AIRCALL SV' || device.name === 'CARAPP PRUEBA BLE'){
     // this.uuid = device.id;
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
   // this.use_connect = localStorage.getItem("use_connect")
   // this.uuidconnect =  localStorage.getItem("uuid");
  console.log("Abriendo ",nombre," con este uid: ", uid)
      this.setStatus('conexion con scan');
      $(".buttonpad").css("background-color","#e39774")
     // $(".buttonpad").css("background-color","rgb(255, 153,81)");
     //console.log("el piso que oprimi fue: " + piso)
     this.Scan();
     setTimeout(() => {
      console.log('INTENTANDO CONECTAR a: ' + uid);
      this.Connect(nombre,uid,"SV")
     }, 1000)
      // this.cancelado = true;
     }

  
  Connect(nombre,uid,mensaje){
      localStorage.setItem("use_connect","0");
      //this.setStatus('uuid: ' + this.uuid + typeof(this.uuid));
     this.setStatus('Comando en cola, esperando...');       
    (<any>window).ble.connect(uid, device => {
      this.setStatus('Enviando comando...');
      console.log('Connected', device);
      this.BleWrite(nombre,uid,mensaje);
      //   setTimeout(() => {
      //   this.Disconnect();
      //  }, 350)
    }, error => {
      console.log('Disconnected', error);
      //this.cancelado = false;
      this.setStatus('Tienes que estar cerca al ascensor');
    });
  }
  
  BleWrite(nombre,uid,mensaje) {
    var data = new Uint8Array(1);
    data[0] = mensaje;
    this.ble.writeWithoutResponse(
            uid, 
            BLE_SERVICE,
            BLE_CHARACTERISTIC,
            data.buffer
        )
        .then(
            data => {
                debugger;   
                console.log(data);
                //this.insertarpiso(piso,valor,viajenum)
                this.setStatus('Piso Marcado!');
                setTimeout(() => {
                  this.Disconnect(uid);
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
