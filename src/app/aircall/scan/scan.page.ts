import { Component, OnInit } from '@angular/core';
import {  NgZone } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { Storage } from "@ionic/storage";
import * as $ from "jquery";

const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  devices:any[] = [];
  
  peripheral: any = {};
  statusMessage: string;
  public dataFromDevice: any;
  power: boolean;
  mipiso:string;
  key:string = 'piso';
  public expanded: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone,
    private alertController: AlertController,
    public router: Router) {
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'alert',
        header: 'Error',
        subHeader: 'Dispositivo equivocado',
        message: 'Debes seleccionar un dispositivo "AIRCALL SV"',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }


        ngOnInit() { }

        // setValue(){ 
        //   this.storage.set(this.key,this.mipiso)
        //   this.setStatus('Configuración guardada! (' + this.mipiso +')' )
        //   //this.storage.get(this.key)
        // }
    
        // getValue(){
        //     this.storage.get(this.key).then((val)=> {
        //     //console.log('Tu piso es: ' + val)
        //     this.setStatus('Tu piso es: ' + val)
        //   })
        // }
    
      // Disconnect peripheral when leaving the page
      // ionViewWillLeave() {
      //   console.log('ionViewWillLeave disconnecting Bluetooth');

      //   $(document).ready(function () {
      //     //your code here
      //   });
      // }
    
      setStatus(message) {
        console.log(message);
        this.ngZone.run(() => {
          this.statusMessage = message;
        });
      }

    //   async showAlert(title, message) {
    //     let alert = await this.alertCtrl.create({
    //         header: title,
    //         message: message,
    //         buttons: ["OK"]
    //     });
    //     alert.present();
    // }

    expandarrow(){
      this.expanded = !this.expanded;
      console.log("espichado mano");
    if (this.expanded){
        $(".scanarrow").css("transform","rotate(90deg)")
        $(".scansv").css("height","300px");
        $(".scangrid").css("display","grid");

    }else{
      $(".scanarrow").css("transform","rotate(0deg)")
       $(".scansv").css("height","0px");
      $(".scangrid").css("display","none");

    }
  }
    
  scan(){
    $(".todo").css("display","block");
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
  }

  deviceSelected(device: any) {
    var deviceid = device.id;
    var devicename = device.name;
    if(devicename == "AIRCALL SV" || devicename == "CARAPP PRUEBA BLE"){
    //console.log(deviceid + ' selected');
    this.setStatus(deviceid + ' selected');
    localStorage.setItem("uuid",deviceid);
    localStorage.setItem("use_connect","1");
    this.modalCtrl.dismiss();
    }else{
      this.presentAlert();
    }
  }

  home(){
    this.modalCtrl.dismiss();
  }

  // connect(piso){
  //   this.setStatus('Comando en cola, esperando...');       
  //   (<any>window).ble.connect(this.uuid, device => {
  //    // this.insertarpiso(pisoint,viajex);
  //     this.setStatus('Enviando comando...');
  //     console.log('Connected', device);
  //     this.BleWrite(piso);
  //    // this.insertarpiso(pisoint,viajex);
  //     setTimeout(() => {
  //       this.Disconnect() 
  //      }, 350)
  //   }, error => {
  //     console.log('Disconnected', error);
  //    // this.cancelado = false;
  //     this.setStatus('Tienes que estar cerca al ascensor');
  //   });
  // }

  //   BleWrite(piso) {
  //     var data = new Uint8Array(1);
  //     data[0] = piso;
  //     this.ble.writeWithoutResponse(
  //             this.uuid, 
  //             BLE_SERVICE,
  //             BLE_CHARACTERISTIC,
  //             data.buffer
  //         )
  //         .then(
  //             data => {
  //                 debugger;   
  //                 console.log(data);
  //                 this.setStatus('Piso Marcado!');
  //                // this.insertarpiso(piso,)
  //             },
  //             err => {
  //                 console.log(err);
  //                 this.setStatus('Error: Intenta de nuevo');
  //             }
  //         );
          
  // }

  //   Disconnect(){
  //     this.ble.disconnect(this.uuid)
  //     .then(data => {
  //     console.log("disconnected good");
  //     //this.cancelado = false;
  //     this.setStatus('¡Listo!'); 
  // });
  //   }

    


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

  
    }
    