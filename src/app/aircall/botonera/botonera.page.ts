import { Component,NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { ToastController,AlertController,Platform, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MenuController } from '@ionic/angular';
import { IonSelect } from '@ionic/angular';
import { ViewChild } from '@angular/core'
//import { NotificationsComponent } from '../../notifications/notifications.component';
import { PopoverController } from '@ionic/angular';
//import { FirestoreService } from '../firestore.service';
import * as moment from 'moment';
import { tick } from '@angular/core/testing';
//import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import * as $ from "jquery";
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ScanPage } from "../scan/scan.page";

var contador = 1;

//a veces se genera un error sobre que no hay cordova o capacitor y exit code 1, webDir debe estar en "src" y no en "www"

const AIRCALL_SERVICE = '';
//_____________________________________________________________
const BLE_SERVICE = "ffe0";
const BLE_CHARACTERISTIC = "ffe1";
//____________________________________________________________
@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.page.html',
  styleUrls: ['./botonera.page.scss'],
})
export class BotoneraPage {

  @ViewChild('pageTop') pageTop: IonContent;

 selected_floors;

  floors = [
                    {valor:"S1",nombre:'sotanouno', code:'0x47',viajes:'0'},
                    {valor:"S2",nombre:'sotanodos', code:'0x48',viajes:'0'},
                    {valor:"S3",nombre:'sotanotres', code:'0x49',viajes:'0'},
                    {valor:1,nombre:'uno', code:'0x31',viajes:'0'},
                    {valor:2,nombre:'dos', code:'0x32',viajes:'0'},
                    {valor:3,nombre:'tres', code:'0x33',viajes:'0'},
                    {valor:4,nombre:'cuatro', code:'0x34',viajes:'0'},
                    {valor:5,nombre:'cinco', code:'0x35',viajes:'0'},
                    {valor:6,nombre:'seis', code:'0x36',viajes:'0'},
                    {valor:7,nombre:'siete', code:'0x37',viajes:'0'},
                    {valor:8,nombre:'ocho', code:'0x38',viajes:'0'},
                    {valor:9,nombre:'nueve', code:'0x39',viajes:'0'},
                    {valor:10,nombre:'diez', code:'0x41',viajes:'0'},
                    {valor:11,nombre:'once', code:'0x42',viajes:'0'},
                    {valor:12,nombre:'doce', code:'0x43',viajes:'0'},
                    {valor:13,nombre:'trece', code:'0x44',viajes:'0'},
                    {valor:14,nombre:'catorce', code:'0x45',viajes:'0'},
                    {valor:15,nombre:'quince', code:'0x46',viajes:'0'},
                    {valor:16,nombre:'diezyseis', code:'0x47',viajes:'0'},
                    {valor:17,nombre:'diezysiete', code:'0x48',viajes:'0'},
                    {valor:18,nombre:'diezyocho', code:'0x49',viajes:'0'},
                    ]


  devices:any[] = [];
  statusMessage: string;
  peripheral: any = {};
  public dataFromDevice: any;
  mipiso:string;
  key:string = 'piso';
  public cancelado = false;
  className: string = 'clase1';

  //uuid: string = '9C:9C:1F:C2:9A:E6'; //<-- ACA HAY QUE COLOCAR EL UUID ESCANEADO POR LA APP DE AIRCALL SCAN SV Y AÑADIRLO AL DOCUMENTO "AIRCALL INSTALADOS UUIDS"
  
  public horaoprimido;
  public veces_oprimido;
  public viajesuno;
  public viajesdos;
  public viajestres;
  public viajescuatro;
  public viajescinco;
  public viajesseis;
  public viajessiete;
  public viajesocho;
  public viajesnueve;
  public viajesdiez;
  public viajesonce;
  public viajesdoce;
  public viajestrece;
  public viajescatorce;
  public uuid = "";
  public uuidconnect;

  backToTop: boolean = false;
  activeconfig: boolean = true;

  public isToggled: boolean;
  public expanded: boolean = false;


  //UUID traida desde el panel de conexion
 
  use_connect: any;

  lat;
  long;

  piso: any = {
    id: "",
    data: {} 
  };

  WeatherData:any = {
    main : {},
    isDay: true
  };

  wind_speed;

  day_mood: string;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private route: ActivatedRoute,
    public popoverController: PopoverController,
    private ngZone: NgZone,
    private alertCtrl: AlertController,
    public router: Router,
    private platform: Platform,
    private geolocation: Geolocation,
    private menu: MenuController,) {

    //   this.platform.ready().then(() => {
    //     this.backgroundMode.on('activate').subscribe(() => {
    //      console.log("me sali y no se onde voy a salir")
    //     this.sveacon();
    //     });

    //     this.backgroundMode.enable();
    // });

    }

    async presentPopover(event) {
      // const popover = await this.popoverController.create({
      //   component: NotificationsComponent,
      //   cssClass: 'popover',
      //   event: event,
      //   translucent: true
      // });
      // return await popover.present();
    }


  ionViewDidEnter() {

    // this.route.params.subscribe(params => {
    //   this.uuidconnect = params['device.id']; 
    // });
   // this.getLocation();
    this.runMyFloors();
    //this.consultarpiso();
    console.log('ionViewDidEntery-----------------------------------');
    //this.sveacon();
    //this.setStatus('Bienvenido, ¿A que piso?');
   // this.menu.enable(true, 'primerMenu'); //Se debe habilitar el menu cada vez que se entra a la pagina
    
  }

  async modal_scan(){
    const modal = await this.modalCtrl.create({
      component: ScanPage,
      cssClass: 'adding_modal',
      componentProps: {
        //uid: this.uid,
       // nombre: this.nombre,
        //proyecto: this.proyecto,
        //reserva: this.reserva
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("esta es la data que devuelve el modal")
      console.log(data)
      var closing = data['data'];
      if (closing) {
        this.runMyFloors();
      }else{
        console.log("no me cierro")
      } 
  });
    return await modal.present();
  }

  runMyFloors(){
    this.use_connect = localStorage.getItem("use_connect");
    this.uuidconnect =  localStorage.getItem("uuid");
    this.selected_floors =  JSON.parse(localStorage.getItem("myfloors"));
      if(this.use_connect == "1"){   
        this.setStatus('::Modo Conexion Directa::');
        this.Conexion_directa(this.uuidconnect);
        console.log("Modo conexion directa: " + this.uuidconnect)
      }else{
    //this.setStatus('selected floors: ' + this.selected_floors);
    if(this.selected_floors == null || this.selected_floors == "" ){
      console.log("Aviso de nuevos usuaddddrios")
      this.setStatus('Introducción');
     //this.pageTop.scrollToPoint(110,65,1000);
      $(".content_tiempo").css("display","none");
      $(".center_bottom_card").css("display","none");
      $(".card").css("display","none");
      $(".logofondo").css("display","none");
      $(".texto").css("display","none")
      $(".textocentral").css("display","block")
      $(".iconPM").css("display","inline-block")
      $(".iconPM").css("transform","rotate(0deg)")
      $(".iconPM").css("bottom","200px")
    }else{
     this.setStatus('Bienvenid@');
     //this.pageTop.scrollToPoint(110,65,1000);
      $(".logofondo").css("display","block");
      $(".content_tiempo").css("display","flex");
      $(".center_bottom_card").css("display","flex");
      $(".card").css("display","block");
      $(".texto").css("display","flex")
      $(".textocentral").css("display","none")
      $(".iconPM").css("display","none") 
      $("#aviso_modo").text("Oprime para ir al piso")
      $("#aviso_modo").css("color","black");
      $(".buttonpad").css("background-color","#e39774")
    }
    }
  }

Conexion_directa(ascensor){
 // localStorage.setItem("use_connect","0");
    //this.setStatus('uuid: ' + this.uuid + typeof(this.uuid)); 
   this.setStatus('Conectando...');       
  (<any>window).ble.connect(ascensor, device => {
    $("#aviso_modo").text("Ascensor Conectado ●")
    $("#aviso_modo").css("color","green");
    $(".buttonpad").css("background-color","#25a244")
   // this.setStatus('Enviando comando...');
    console.log('Connected', device);
    this.setStatus('::Modo conexion Directa::');
   // this.BleWrite(piso,valor,viajenum);
    //   setTimeout(() => {
    //   this.Disconnect();
    //  }, 350)
  }, error => {
    console.log('Disconnected', error);
    this.cancelado = false;
    this.setStatus('No se establecio conexion');
    $("#aviso_modo").text("Ascensor No Conectado ●")
    $("#aviso_modo").css("color","red");
    $(".buttonpad").css("background-color","#e39774")
  });
}

onChange(){
  //$("summary").click();
  this.configactivated();
  this.pageTop.scrollToPoint(110,65,1000);
 localStorage.setItem("myfloors",JSON.stringify(this.selected_floors))
  console.log("Selection on change activated: " + this.selected_floors)
  this.setStatus('selected floors: ' + this.selected_floors);
  if(this.selected_floors != ""){
    this.setStatus('Bienvenid@');
   // console.log("Desplegar los pisos favs")
    $(".texto").css("display","flex")
    $(".textocentral").css("display","none")
    $(".iconPM").css("display","none")
    $(".content_tiempo").css("display","flex");
    $(".center_bottom_card").css("display","flex");
    $(".card").css("display","block");
    // setTimeout(()=>{
    //   $(".logofondo").css("display","flex");
    //   $(".logofondo").css("z-index","1");
    // },1000)
  }else{
  //  console.log("Aviso de nuevos usuarios")
  $(".logofondo").css("display","none");
  $(".iconPM").css("display","inline-block")
  $(".iconPM").css("transform","rotate(0deg)")
  $(".iconPM").css("bottom","200px")
  $(".content_tiempo").css("display","none");
  $(".center_bottom_card").css("display","none");
  $(".card").css("display","none");

    this.setStatus('Introducción');
  $(".texto").css("display","none")
  $(".textocentral").css("display","block")
  }
}

async alert(header,subHeader,message) {
  const alert = await this.alertCtrl.create({
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

Connected(piso,valor,viajenum){
  this.check_ble_configs()
  this.use_connect = localStorage.getItem("use_connect")
  console.log("Bandera de modod conexion: ",this.use_connect)
  this.uuidconnect =  localStorage.getItem("uuid");
  $(".buttonpad").css("background-color","#e39774");
  $("#aviso_modo").text("Oprime para ir al piso");
  if(this.use_connect == "1"){
    this.setStatus('Enviando comando CD');
   // this.uuidconnect =  localStorage.getItem("uuid");
    //$(".buttonpad").css("background-color","blue");
    //this.uuid = this.uuidconnect;
    //this.Connect(piso,valor,viajenum);
    this.BleWrite(piso,valor,viajenum,this.uuidconnect); 
    localStorage.setItem("use_connect","0");
    $("#aviso_modo").text("Oprime para ir al piso")
    $("#aviso_modo").css("color","black");
    $(".buttonpad").css("background-color","#e39774")
  }else{
    this.setStatus('conexion con scan');
    $(".buttonpad").css("background-color","#e39774")
   // $(".buttonpad").css("background-color","rgb(255, 153,81)");
   //console.log("el piso que oprimi fue: " + piso)
   this.Scan();
   setTimeout(() => {
        if(this.uuid === ""){
          this.setStatus('No se encontró el dispositivo');
          setTimeout(() => {
          this.setStatus('Debes estar dentro del ascensor');
            }, 1000)
         }else{
          setTimeout(() => {
          console.log('INTENTANDO CONECTAR a: ' + this.uuid);
          this.Connect(piso,valor,viajenum)
          }, 500)
       }
   }, 1000);
    // this.cancelado = true;
   }
}

Connect(piso,valor,viajenum){
    localStorage.setItem("use_connect","0");
    //this.setStatus('uuid: ' + this.uuid + typeof(this.uuid));
   this.setStatus('Comando en cola, esperando...');
  (<any>window).ble.connect(this.uuid, device => {
    this.setStatus('Enviando comando...');
    console.log('Connected', device);
    this.BleWrite(piso,valor,viajenum,this.uuid);
    //   setTimeout(() => {
    //   this.Disconnect();
    //  }, 350)
  }, error => {
    console.log('Disconnected', error);
    this.cancelado = false;
    this.setStatus('Tienes que estar cerca al ascensor');
  });
}

BleWrite(piso,valor,viajenum,uuid) {
  var data = new Uint8Array(1);
  data[0] = piso;
  this.ble.write(
          uuid, 
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
                this.Disconnect(uuid);
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
  this.cancelado = false;
  this.setStatus('¡Listo!'); 
     setTimeout(() => {
     this.setStatus('Bienvenid@');
     }, 1000)
});
}

downpage(){
    this.pageTop.scrollToBottom(1000);
}

  comenzar(){
    //this.getLocation();
    this.configactivated();
    console.log("subiendo....")
    this.pageTop.scrollToTop(1000)
    // setTimeout(() => {
    $(".iconPM").css("transform","rotate(180deg)")
    $(".iconPM").css("bottom","200px")
    $("summary").click();
    //    this.setStatus('Introducción XXX');
    //  }, 1100)
  }

  configactivated(){
    if (this.activeconfig){
      $(".iconPMF").css("transform","rotate(90deg)")
      $(".edit_floors").css("display","flex")
      $(".card").css("filter","blur(5px)")
      $(".textocentral").css("filter","blur(5px)")
      $(".textocentral").css("width","90%")
      $(".textocentral").css("margin-left","5%")
      $(".align-center").css("filter","blur(8px)")
      $(".align-center").css("width","90%")
      $(".align-center").css("margin-left","5%")
      $(".logofondo").css("display","none")
      $(".iconPM").css("transform","rotate(180deg)")
      $(".iconPM").css("bottom","200px")
      this.activeconfig = false;
    }else{
      $(".iconPMF").css("transform","rotate(0deg)")
      $(".edit_floors").css("display","none")
      $(".card").css("filter","blur(0px)")
      $(".textocentral").css("filter","blur(0px)")
      $(".textocentral").css("width","100%")
      $(".textocentral").css("margin-left","0%")
      $(".align-center").css("filter","blur(0px)")
      $(".align-center").css("width","100%")
      $(".align-center").css("margin-left","0%")
      // $(".logofondo").css("display","block")
      // $(".logofondo").css("z-index","1")
      $(".iconPM").css("bottom","200px")
      $(".iconPM").css("transform","rotate(0deg)")
      this.activeconfig = true;
    }
    
  }

    //FUNCION QUE GUARDA EL PISO DE CADA PERSONA LOCALMENTE
  
    guardarmipiso(){
      if (this.isToggled){
        console.log("Piso guardadito y togleado")
      }else{
        console.log("Piso guardadito")
      }
      
    }
  
    // sveacon(){
    //   if(this.isToggled){
    //   setInterval(() => {
    //     console.log('sveacon escaneando: ');
    //       this.Connected('0x35')
    //      }, 10000)
    // }
    // else{
    //   console.log('sveacon desactivado');
    // }
    // }

    expandarrow(){
      this.expanded = !this.expanded;
      console.log("espichado mano");
    if (this.expanded){
        $(".scanarrow").css("transform","rotate(90deg)")
        $(".scansv").css("height","200px");
        $(".scangrid").css("display","grid");

    }else{
      $(".scanarrow").css("transform","rotate(0deg)")
       $(".scansv").css("height","0px");
      $(".scangrid").css("display","none");

    }
    

    //   $( ".scanarrow" ).click(function() {
    //     //alert($( this ).css( "transform" ));
    //     if (  $( this ).css( "transform" ) == 'none' ){
    //         $(this).css("transform","rotate(90deg)");
    //     } else {
    //         $(this).css("transform","" );
    //     }

        
    // });

    }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Assistencia inmediata en caso de emergencia ',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

//   rateMe(){
//     this.appRate.preferences.storeAppURL = {
//     ios: '< my_app_id >',
//     android: 'market://details?id=io.aircall.delpino',
//     windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
//     };

//     this.appRate.promptForRating(true); 
// }


  // llamar(number){
  //   console.log("Entre a la llamada de emergencia")
  //   this.callNumber.callNumber(number, true)
  //  .then(res => console.log('Launched dialer!', res))
  //   .catch(err => console.log('Error launching dialer', err));
  //   }


  refreshpageconnection(){
    this.ionViewDidEnter();
    //this.Disconnected();
  }

  togglemenu(){
    this.menu.toggle();
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
    //this.setStatus('buscando...');
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
   // this.setStatus('Ocurrio un problema');
    this.setStatus('Error ' + error);
    let toast = await this.toastCtrl.create({
      message: 'Error escaneando dispositivos Bluetooh',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  // on selecting the device, you will be redirected to next page, with details of the device selected
  deviceSelected(device: any) {
    console.log(JSON.stringify(device) + ' selected');
    let navigationExtras: NavigationExtras = {
      queryParams: {
          special: JSON.stringify(device)
      }
  };
  this.router.navigate(['details'], navigationExtras);
  }


dismiss(){
  $(".align-center").css("filter","blur(0px)")
  $(".card").css("filter","blur(0px)")
  $(".logofondo").css("display","block");
  $(".content_tiempo").css("display","flex");
  $(".center_bottom_card").css("display","flex");
  $(".card").css("display","block");
  $(".texto").css("display","flex")
  $(".textocentral").css("display","none")
  $(".iconPM").css("display","none") 
  $("#aviso_modo").text("Oprime para ir al piso")
  $("#aviso_modo").css("color","black");
  $(".buttonpad").css("background-color","#e39774")
  this.modalCtrl.dismiss(false);
}

// cancelcall(){
  //   this.setStatus('LLamada cancelada');
  //    this.Disconnected()
  //    setTimeout(() => {
  //     this.setStatus('¡Bienvenido! ¿A que piso?'); 
  //    }, 1000)
  //  }

  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

     // FUNCION PARA INSERTAR PISOS EN FIRESTORe

  // insertarpiso(piso,valor,viajenum){ 
  //   viajenum++;
  //   console.log("viaje +  1 : " + viajenum)
  //   this.horaoprimido = new Date(Date.now());
  //   var ti = moment(this.horaoprimido).format('h:mm a');
  //   var dt = moment(this.horaoprimido).format('DD-MM-YY');
  //   this.firestoreService.insertar("historial/"+dt+"/"+valor,"/llamada"+viajenum,{"timestamp": ti})
  //   this.firestoreService.update("pisos/",valor,{"veces_oprimido": viajenum})
  //   this.firestoreService.insertar("pisos/"+valor+"/viajes","/viaje"+ viajenum,{"timestamp": ti})
  //   this.firestoreService.update("pisos/"+valor+"/viajes","/viaje"+ viajenum,{"datestamp": dt})
  // }

  // consultarpiso(){
  //   this.firestoreService.consultarPorId("pisos/","1").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesuno = this.piso.data.veces_oprimido
  //       console.log("EL viaje ES: " + this.viajesuno)
  //     console.log("TIPO: " + typeof(this.viajesuno))
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","2").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesdos = this.piso.data.veces_oprimido
  //       console.log("EL viaje ES: " + this.viajesdos)
  //     console.log("TIPO: " + typeof(this.viajesdos))
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","3").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajestres = this.piso.data.veces_oprimido
  //       console.log("EL viaje ES: " + this.viajestres)
  //     console.log("TIPO: " + typeof(this.viajestres))
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","4").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajescuatro = this.piso.data.veces_oprimido
  //       console.log("EL viaje ES: " + this.viajescuatro)
  //     console.log("TIPO: " + typeof(this.viajescuatro))
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","5").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajescinco = this.piso.data.veces_oprimido
  //       console.log("EL viaje ES: " + this.viajescinco)
  //     console.log("TIPO: " + typeof(this.viajescinco))
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","6").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesseis = this.piso.data.veces_oprimido
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","7").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajessiete = this.piso.data.veces_oprimido
        
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","8").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesocho = this.piso.data.veces_oprimido
        
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","9").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesnueve = this.piso.data.veces_oprimido
        
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","10").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesdiez = this.piso.data.veces_oprimido
       
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","11").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesonce = this.piso.data.veces_oprimido
        
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","12").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajesdoce = this.piso.data.veces_oprimido
       
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","13").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajestrece = this.piso.data.veces_oprimido
       
  //     }      
  //   });
  //   this.firestoreService.consultarPorId("pisos/","14").subscribe((resultado) => {
  //     if(resultado.payload.data() != null) {
  //       this.piso.id = resultado.payload.id
  //       this.piso.data = resultado.payload.data();
  //       console.log("datos--> del viaje " + this.piso.data.veces_oprimido);
  //       this.viajescatorce = this.piso.data.veces_oprimido
       
  //     }      
  //   });
  // }
}
