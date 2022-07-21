import { Component, OnInit, Input} from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { FirestoreService } from "../firestore.service";
import { ModalController } from "@ionic/angular";
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { ReservasPage  } from "../reserva/reservas/reservas.page";
import { ComunicadosPage } from "../comunicados/comunicados.page";
import { PagoadminPage } from "../pagoadmin/pagoadmin.page";
import { MonitoreoPage } from "../monitoreo/monitoreo.page";
import { UsuariosPage } from "../usuarios/usuarios.page";
import { BotoneraPage } from "../aircall/botonera/botonera.page";
import { ControlPopupPage } from '../control-popup/control-popup.page';
import { PopoverController } from '@ionic/angular';
import { EmergenciasPage } from "../emergencias/emergencias.page";
import { DocumentosPage } from "../documentos/documentos.page";
import { MascotasPage } from "../mascotas/mascotas.page";
import { TrasteosPage } from "../trasteos/trasteos.page";
import { ClasificadosPage } from "../clasificados/clasificados.page";
import { DirectorioPage } from "../directorio/directorio.page";
import { FinanzasPage } from "../finanzas/finanzas.page";
import { EncuestasPage } from "../encuestas/encuestas.page";
import { BeneficiosPage } from "../beneficios/beneficios.page";
import { AutorizacionesPage } from "../autorizaciones/autorizaciones.page";
import { SeguridadPage } from "../seguridad/seguridad.page";
import { PreguntasPage } from "../preguntas/preguntas.page";
import { AccesoPage } from "../acceso/acceso.page";
import { EventosPage } from "../eventos/eventos.page";
import { CitofoniaPage } from "../citofonia/citofonia.page";
import { AlertController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";
import { VotacionesPage } from "../voting/votaciones/votaciones.page";
import { ParkingPage } from "../park/parking/parking.page";
import { InscribirseModalPage } from "../inscripciones/inscribirse-modal/inscribirse-modal.page";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as $ from "jquery";
import { LoadingController } from '@ionic/angular';
import { PerfilPage } from "../perfil/perfil.page";
import { Console } from 'console';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

//variable que guardara el proyecto en el que el usuario está (current_proyect)
  proyecto;
  
  //Variables que activan y desactivan *NgIf en el HTML
  activate_account: boolean;

  //Variables que contienen los datos del CurrentUser
  current_user_uid;
  current_user_name;
  current_user_email;
  current_user_rol;
  current_user_activate;
  current_user_apto;
  current_user_image;

  user_info: any = {
    id: "",
    data: {}
};

new_user: boolean;

//Variables de localizacion y Clima --
  lat;
  long;
  wind_speed;
  day_mood: string;
  WeatherData:any = {
    main : {},
    isDay: true
  };

  //Comunidados de cada edificio (this.proyecto)
  comunicados = [];

  //Variables relacionadas a los servicios
  lista_servicios = [];
  lista_proyectos = [];

  profile_image_yes: boolean;
  account_config_ok: Boolean;

admin_email;
admin_name;

  proyect_services: any = {
    id: "",
    data: {}
};

app: any = {
  id: "",
  data: {}
};

torres = [];
torre: any = {
  id: "",
  data: {}
};
tower;
torr;
apt;
aptos = [];
apto;
setApt: Boolean;
inquilino
habilitado: Boolean = true;

option = {
  slidesPerView: 1,
  centeredSlides: true,
  loop: false,
  spaceBetween: 0,
  autoplay:true,
}

option_big = {
  slidesPerView: 1.2,
  centeredSlides: true,
  loop: true,
  spaceBetween: 5,
  autoplay:false,
}

show: boolean
show_services: boolean

name: any 

loading: HTMLIonLoadingElement;

no_proyect;

 // Servicios_np : any = this.Servicios_np

 constructor(private loadingController: LoadingController,
  public popoverController: PopoverController,
  private emailComposer: EmailComposer,
  private geolocation: Geolocation,
  public alertController: AlertController,
  public  router: Router,
  private fbs: FirestoreService,
  private modalCtrl: ModalController ,
  private authSvc: AuthService,
  public afAuth:AngularFireAuth, 
  private afs: AngularFirestore) {
}

admin = [
 {"nombre":"Reservas",
    "descripcion":"Gestiona tus reservas",
    "icon":"calendar-outline",
    "habilitado":true},

    {"nombre":"Votaciones",
    "descripcion":"Votaciones de los usuarios",
    icon:"pie-chart-outline",
    "habilitado":true},

    {"nombre":"Comunicados",
    "descripcion":"Lee comunicados importantes",
    icon:"newspaper-outline",
    "habilitado":true},

    {"nombre":"Directorio",
    "descripcion":"Directorio telefonico",
    icon:"call-outline",
    "habilitado":true},

    {"nombre":"Preguntas",
    "descripcion":"Resuelve tus dudas",
    icon:"information-outline",
    "habilitado":true},

    {"nombre":"Eventos",
    "descripcion":"Revisa los proximos eventos del edificio",
    icon:"calendar-number-outline",
    "habilitado":true},

    {"nombre":"Beneficios",
    "descripcion":"Accede a beneficios",
    icon:"diamond-outline",
    "habilitado":true},

    {"nombre":"Documentos",
    "descripcion":"Descarga documentos importantes",
    icon:"document-attach-outline",
    "habilitado":true},

    {"nombre":"Clasificados",
    "descripcion":"Servicios externos adicionales",
    icon:"storefront-outline",
    "habilitado":true},

    {"nombre":"Encuestas",
    "descripcion":"Responde encuestas acerca del edificio",
    icon:"clipboard-outline",
    "habilitado":true},

    {"nombre":"Finanzas",
    "descripcion":"Revisa los archivos de presupuestos",
    icon:"bar-chart-outline",
    "habilitado":true},

    {"nombre": "Pagos",
    "descripcion":"Accede al link de pago",
    icon:"cash-outline",
    "habilitado":true},

    {"nombre":"Emergencias",
    "descripcion":"Contacto directo con el Call-Center del ascensor",
    icon:"alert-circle-outline",
    "habilitado":true},
    
    {"nombre":"Parking",
    "descripcion":"Consigue parqueadero",
    icon:"car-outline",
    "habilitado":true},
]

control = [
  {"nombre":"Acceso",
      "descripcion":"Utiliza el celular para ingresar a las torres",
      icon:"id-card-outline",
      "habilitado":true},

      {"nombre":"AirCall",
      "descripcion":"Controla el Ascensor",
      icon:"keypad-outline",
      "habilitado":true},
]

personal = [
  {"nombre":"Autorizaciones",
    "descripcion":"Formulario para autorizaciones",
    icon:"checkmark-outline",
    "habilitado":true},

    {"nombre":"Ingreso Mascotas",
    "descripcion":"Temas relacionados con tu mascota",
    icon:"paw-outline",
    "habilitado":true},

    {"nombre":"Avisos de trasteo",
    "descripcion":"Rellena el formulario de aviso para trasteos",
    icon:"construct-outline",
    "habilitado":true},
] 

  monitor = [ 
    {"nombre":"Monitoreo",
    "descripcion":"Monitorea en tiempo real datos obtenidos",
    icon:"eye-outline",
    "habilitado":true},
    
    {"nombre":"Seguridad",
    "descripcion":"Revisa los temas de seguridad",
    icon:"shield-half-outline",
    "habilitado":true},

    {"nombre":"Citofonia",
    "descripcion":"Controla la entrada de visitantes",
    icon:"volume-high-outline",
    "habilitado":true},
 ]

  ngOnInit() {
    this.proyecto = localStorage.getItem("last");
    console.log("ultimo favorito: ", this.proyecto)
    console.log(this.proyecto)
    if (this.proyecto) {
      console.log("Si hay proyecto anterior");
      this.presentLoading();
      this.no_proyect = true;
    }else{
      this.no_proyect = false;
      console.log("No hay proyecto anterior")
    }
    this.getLocation();
    this.new_user = true;
    this.getuseruid();
    this.setApt = false;
   // this.current_user_image = this.imageURL
   this.account_config_ok = true;
   this.profile_image_yes = false;
    //console.log("img url", this.current_user_image)
    this.activate_account = true;
    
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
       this.lat = resp.coords.latitude;
       this.long = resp.coords.longitude;
      //  console.log("lat: " + this.lat + "   long: " + this.long)
      // setTimeout(()=>{
        this.getWeatherData();
      // },2000)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
     });
  }

  getWeatherData(){ 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+this.lat+'&lon='+this.long+'&appid=7985db256b85b778e9af4d7ea225aaeb')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data){
    this.WeatherData = data;
    console.log("data: ")
    console.log( this.WeatherData)
    this.wind_speed = this.WeatherData.wind.speed;
    this.day_mood = (this.WeatherData.weather[0].main)
    console.log("MOOOOOOD: " + this.day_mood)
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    if (this.day_mood === "Rain") {
      $("#lluvia").text("Esta lloviendo")
      $("#lluvia").css("color","red");
      console.log("si llueve")
    }else{
      $("#lluvia").text("No esta lloviendo")
      $("#lluvia").css("color","green");
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Obteniendo datos, por favor espere...'
    });
    return this.loading.present();
  }

  //PROBAR ESTE ACORDEON!!!!!!!!--------------------------
  myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }

  async getuseruid(){
    //try{
      var user_uid = localStorage.getItem("uid");
      //localStorage.clear();
      // console.log("traido de minibd: ", user_uid)
       if (!user_uid) {
        // console.log("No habia ningun uid guardado")
          var uid = await (await this.afAuth.currentUser).uid
          localStorage.setItem("uid",uid);
         // console.log("Se guardo el UID en la miniBD:)")
         // console.log(uid)
          this.current_user_uid = uid
         // console.log("uid:",this.current_user_uid)
          this.getName(uid);
       }else{
        // console.log("Ya habia valor gurdado y se uso ese")
         this.current_user_uid = user_uid
        //  console.log("uid:",this.current_user_uid)
          this.getName(user_uid);
       }
   // }
    // catch(error){
    //   console.log("Errorsuelo:",error)
    //   this.router.navigate(["/iniciosesion"])
    //   //this.presentAlert(error);
    // }
  }

  async getName(uid){
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
      }  
      this.current_user_name = this.user_info.data.nombre;
      localStorage.setItem("nombre",this.current_user_name);
      this.current_user_email = this.user_info.data.email;
      this.current_user_rol = this.user_info.data.rol;
      this.current_user_activate = this.user_info.data.habilitado;
      this.current_user_apto = this.user_info.data.apto;
      this.current_user_image = this.user_info.data.image_url;
      //console.log("el usuario esta activado? :",this.current_user_activate)
      //let edificio = this.user_info.data.proyecto
      this.consultar_proyectos()
      console.log("Apartamento, img url ",this.current_user_activate, this.current_user_image)
        //this.current_user_apto = "4048"
  if (this.current_user_apto) {
    console.log("si hay algo en 'apto'")
    this.account_config_ok = true;
  }else{
    console.log("No hay nada en 'apto'")
    this.account_config_ok = false;
  }
  if (this.current_user_image) {
    console.log("Si hay algo en 'image_url'")
    this.profile_image_yes = true;
  }else{
    console.log("No hay nada en 'image_url'")
    this.profile_image_yes = false;
  }
   this.get_more_user_info();
  });
  }

  proyecto_info(){
    this.no_proyect = true;
    console.log("este es el proeycto favorito: ", this.proyecto);
    localStorage.setItem("last",this.proyecto);
    this.get_more_user_info();
  }

  get_more_user_info(){
    // console.log("habilitado en : ", this.proyecto,this.current_user_name)
    this.fbs.consultarPorId("Proyectos/"+this.proyecto+"/usuarios/", this.current_user_name).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.torre.id = resultado.payload.id;
          this.torre.data = resultado.payload.data();
      }
      console.log("data_")
      console.log(this.torre)
      this.tower = this.torre.data.torre
      this.apto = this.torre.data.apto
      localStorage.setItem("torre",this.tower)
      localStorage.setItem("apto",this.apto)
      this.habilitado = this.torre.data.habilitado
      console.log("info", this.tower , this.apto ,this.habilitado)
      if(this.apto){
        this.account_config_ok = true
      }else{
        this.account_config_ok = false;
      }
      this.get_services()
    })
  }

  get_services(){
    this.fbs.consultar("servicios").subscribe((servicios) => {
      this.lista_servicios = [];
      servicios.forEach((datosTarea: any) => {
        this.lista_servicios.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      // console.log("lista de servicios: " , this.lista_servicios)
      // console.log("tipo: " , typeof(this.lista_servicios))
    })
    this.get_proyect_services()
  }

  get_proyect_services(){
    this.fbs.consultarPorId("Proyectos/", this.proyecto).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.proyect_services.id = resultado.payload.id;
          this.proyect_services.data = resultado.payload.data();
      }
      var test = this.proyect_services.data;
      // console.log("test: ", test)
      // console.log("dataa larga: ")
      // console.log(typeof(test))
      var result = Object.keys(test).map((key) => [key, test[key]]);
      // console.log("resultado:" ,result);
      this.lista_servicios.forEach((servicio: any) => {
       for (let index = 0; index < result.length; index++) {
         if(result[index][0].toUpperCase() === servicio.data.nombre.toUpperCase()){
            // console.log(typeof(servicio.data) , " - " ,servicio.data.nombre.toUpperCase() , " - " , result[index][0].toUpperCase() , " - " , result[index][1] );
            const objToPush = {
               habilitado:  result[index][1] 
            };
           servicio.data = { ...servicio.data, ...objToPush };
         }
       }
      })
      // console.log("Areglo final crack: " , this.lista_servicios)
// Reservas, AirCall, Comunicados, Mascotas, Aviso de trasteo, Directorio, Autorizaciones, Preguntas, Emergencia Ascensor, Eventos
// Documentos, Clasificados, Encuestas, Controles de Acceso
// Pagos, Monitoreo, Finanzas, Beneficios, Seguridad, Citofonia
  });
  this.get_comunicados()
}

redirect(path){
  this.elegir_servicio(path,true)
}

consultar_proyectos(){
  // this.presentLoading();
   if (this.current_user_activate === false) {
     console.log("non activated false: ", this.current_user_activate)
     this.activate_account = false; 
     this.new_user = false;
   } else {
     console.log("activated")
     this.activate_account = true; 
      console.log()
     
     this.fbs.consultar("user/"+this.current_user_uid+"/proyectos").subscribe((servicios) => {
       this.lista_proyectos = [];
       servicios.forEach((datosTarea: any) => {
         this.lista_proyectos.push({
           id: datosTarea.payload.doc.id,
           data: datosTarea.payload.doc.data()
         });
       })
       
      //  console.log("lista de servicios: " , this.lista_proyectos)
        if (this.lista_proyectos.length === 0) { 
       console.log("usuario nuevo sin negocio")
       this.new_user = true;      
     } else {
       this.new_user = false;
       console.log("usuario nuevito ")
       
     }
      setTimeout(() => {
      // this.loading.dismiss();
      }, 800);
     });
   }
   
   // this.fbs.consultar("user/"+this.current_user_uid+"/proyectos").subscribe((servicios) => {
   //   this.lista_proyectos = [];
   //   servicios.forEach((datosTarea: any) => {
   //     this.lista_proyectos.push({
   //       id: datosTarea.payload.doc.id,
   //       data: datosTarea.payload.doc.data()
   //     });
   //   })
   //   console.log("proyectos: " ,this.lista_proyectos)
   // });
 }

  send_email(){
    console.log(this.current_user_email,this.admin_email,this.admin_name)
    let email = {
      app: "PROPY",
      from: this.current_user_email,
      to: this.admin_email,
      cc: '',
      subject: 'Cuenta bloqueada - Contacto con administrador',
      body: 'Buen dia, <br><br> Envio este correo para solicitar amablemente la activación de mi cuenta PROPY o que se contacten conmigo, muchas gracias! <br><br> Cordialmente, <br> '+ this.current_user_name,
      isHtml: true
    }
    this.emailComposer.open(email);
  }

  cerrarsesion(){
    localStorage.setItem("uid","")
    this.authSvc.logout();
    this.router.navigate(["/iniciosesion"])
  }

  async unsubscribe() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Estas seguro?',
      subHeader: 'Estas a punto de desuscribirte de ' + this.proyecto,
      message: "Perderás todas las reservas y datos relacionados"  ,
      buttons: [
        {
          text: 'Atrás',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          //  console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            //console.log('Confirm Okay');
            this.delete()
          }
        }
      ]
    });
    await alert.present();

  // const { role } = await alert.onDidDismiss();
  // console.log('onDidDismiss resolved with role', role);
}

get_comunicados(){
  this.fbs.consultar("/Proyectos/"+this.proyecto+"/comunicados").subscribe((servicios) => {
    this.comunicados = [];
    console.log("banderaaaaaaaaaa",this.comunicados)
    servicios.forEach((datosTarea: any) => {
      this.comunicados.push({
        id: datosTarea.payload.doc.id,
        data: datosTarea.payload.doc.data()
      });
    })
    //this.password = this.lista_proyectos.data.key
    console.log("traigamos la lista de comunicados")
    console.log(this.comunicados)
  });
  if (this.proyecto) {
    setTimeout(() => {
      this.loading.dismiss();
     }, 500);
    }
    // else{
    //   this.no_proyect = false;
    // }
 
}

async deshab_popup() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: "¿Por que mi cuenta esta bloqueada?",
    subHeader: "Estas son las posibles razones",
    message: "- Acabas de inscribirte al edificio y debes esperar a que verifiquen tus datos <br><br> - El administrador te deshabilitó por algun motivo relacionado a pagos <br><br> - El administrador te deshabilitó en forma de penalización",
    buttons: [
      {
        text: 'Entendido',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
  });
  await alert.present();
  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}


  // async presentAlert(tittle,header,text) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: tittle,
  //     subHeader: header,
  //     message: text,
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         id: 'cancel-button',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Avisar',
  //         id: 'confirm-button',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //            let email = {
  //             app: "PROPY",
  //             from: this.email,
  //             to: this.admin_email,
  //             cc: '',
  //             subject: 'Rellena la información y envia este correo',
  //             body: 'Hola ' + this.nombre + '. <br><br> Por temas de seguridad, solicitamos a los administradores que verifiquen la información de los usuarios antes de asignarles su apartamento.<br><br> Para esto, necesitamos que llenes la siguiente información: <br><br> - Cédula propietario: <br> - Apartamento: <br> - Integrantes del apto (para inscribirlos también)<br><br> Una vez rellenes todos los datos envia este correo.',
  //             isHtml: true
  //           }
  //           this.emailComposer.open(email);
  //           //this.router.navigate(["inscripciones"])
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  //   const { role } = await alert.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  return_flag(){
    this.modalCtrl.dismiss({
        activated: true
      })
  }


  async presentPopover(event) {
    const modal = await this.modalCtrl.create({
      component: ControlPopupPage,
      cssClass: 'popover_control',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this. current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("eewjvnaskljvlkhj")
            console.log(data)
        //   this.storage.forEach((value, key, index) => {
        //   console.log(`ITEM - ${key} = ${value} [${index}]`);
        // });
      
  });
    return await modal.present();
  }


  async abrirmodal(){
    const modal = await this.modalCtrl.create({
      component: InscribirseModalPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this. current_user_name
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("eewjvnaskljvlkhj")
      console.log(data)
      var closing = data['data'];
      if (closing) {
          this.ngOnInit();
      }else{
          console.log("Cerrado sin inscribirse a ni M")
      } 
        //   this.storage.forEach((value, key, index) => {
        //   console.log(`ITEM - ${key} = ${value} [${index}]`);
        // });
      
  });
    return await modal.present();
  }

  get_torres(){
    this.fbs.consultar("Proyectos/"+this.proyecto+"/apartamentos").subscribe((servicios) => {
            servicios.forEach((datosTarea: any) => {
              this.torres.push({
                id: datosTarea.payload.doc.id,
                data: datosTarea.payload.doc.data()
              });
            })
            //this.password = this.lista_proyectos.data.key
            console.log("traigamos la lista de torres")
            console.log(this.torres)
          });
  }

  show_building_selector(){
    console.log("abriendo")
   // $(".proyect_selector").css("display","block");
    $(".proyect_selector").click();
  }

  async modal_info(url){
    const modal = await this.modalCtrl.create({
      component: InfoPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        //proyecto: this.proyecto,
        url: url,
        modaly: "clasificados"
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


  elegir_servicio(servicio,habilitado){
    if (!this.habilitado){
      alert("No estás habilitado para utilizar la APP, contacta a tu Administrador para que te habilite")
    }else{
    if (!this.apto) {
      alert("Debes estar inscrito a un apartamento para comenzar a usar los servicios, si todavia no tienes asignado un apartamento contacta al administrador")
    }else{
    if(!habilitado){
      alert("El administrador de este edificio no tiene activo este servicio activo")
    }else{
      console.log("elegiste el servicio: ", servicio)
      // console.log("Vamos a elegir que ventana abrir dependiendo del servicio oprimido, este es el servicio: " + servicio)
        if (servicio == "Reservas") {
        // console.log("reservas if")
          this.modal_reservas();
        // this.modalCtrl.dismiss();
        }
        if (servicio == "Pagos") {
        // console.log("Pago admin if")
          this.modal_pagos();
        }
        if (servicio == "Comunicados") {
        // console.log("comunicados if")
          this.modal_comunicados();
        }
        if (servicio == "Votaciones") {
          // console.log("comunicados if")
           this.modal_votaciones();
         }
        if (servicio == "Documentos") {
          console.log("Documentos");
          this.modal_documentos();
        }
        if (servicio == "AirCall") {
          this.modal_aircall();
        }
        if (servicio == "Usuarios") {
          this.modal_usuarios();
        }
        // if (servicio == "Ingreso Mascotas") {
        //   console.log("Mascotas");
        //   this.modal_mascotas();
        // }
        if (servicio == "Avisos de trasteo") {
          console.log("Aviso trasteo");
          this.modal_trasteos();
        }
        if (servicio == "Monitoreo") {
          console.log("Monitoreo");
          this.modal_monitoreo();
        }
        if (servicio == "Clasificados") {
          console.log("Clasificados");
          this.modal_clasificados();
        }
        if (servicio == "Directorio") {
          console.log("Directorio");
          this.modal_directorio();
        }
        if (servicio == "Finanzas") {
          console.log("Finanzas");
          this.modal_finanzas();
        }
        if (servicio == "Encuestas") {
          console.log("Encuestas");
          this.modal_encuestas();
        }
        if (servicio == "Beneficios") {
          console.log("Beneficios");
          this.modal_beneficios();
        }
        // if (servicio == "Autorizaciones") {
        //   console.log("Autorizar");
        //   this.modal_autorizaciones();
        // }
        if (servicio == "Seguridad") {
          console.log("Seguridad");
          this.modal_seguridad();
        }
        if (servicio == "Preguntas") {
          console.log("QA");
          this.modal_preguntas();
        }
        if (servicio == "Emergencias") {
          this.modal_emergencias();
        }
        if (servicio == "Acceso") {
          console.log("Acceso");
          this.modal_acceso();
        }
        if (servicio == "Eventos") {
          console.log("Eventos");
          this.modal_eventos();
        }
        if (servicio == "Citofonia") {
          console.log("Citofonia");
          this.modal_citofonia();
        }
        if (servicio == "Parking") {
          console.log("Parking");
          this.modal_parking();
        }
    }
  }
   }
  }

  async modal_parking(){
    const modal = await this.modalCtrl.create({
      component: ParkingPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_emergencias(){
    const modal = await this.modalCtrl.create({
      component: EmergenciasPage,
      cssClass: 'emergencias_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
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

  async modal_aircall(){
    const modal = await this.modalCtrl.create({
      component: BotoneraPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
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

  async modal_usuarios(){
    const modal = await this.modalCtrl.create({
      component: UsuariosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
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

  async modal_monitoreo(){
    const modal = await this.modalCtrl.create({
      component: MonitoreoPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_pagos(){
    const modal = await this.modalCtrl.create({
      component: PagoadminPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_comunicados(){
    const modal = await this.modalCtrl.create({
      component: ComunicadosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_votaciones(){
    const modal = await this.modalCtrl.create({
      component: VotacionesPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_reservas(){
    const modal = await this.modalCtrl.create({
      component: ReservasPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_documentos(){
    const modal = await this.modalCtrl.create({
      component: DocumentosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  // async modal_mascotas(){
  //   const modal = await this.modalCtrl.create({
  //     component: MascotasPage,
  //     cssClass: 'adding_modal',
  //     componentProps: {
  //       uid: this.uid,
  //       nombre: this.nombre,
  //       proyecto: this.proyecto,
  //       apto: this.apto,
  //       torre: this.tower
  //       //reserva: this.reserva
  //     }
  //   });
  //   modal.onDidDismiss()
  //   .then((data) => {
  //     console.log("esta es la data que devuelve el modal")
  //     console.log(data)
  //     var closing = data['data'];
  //     if (closing) {
  //       this.modalCtrl.dismiss()
  //     }else{
  //       console.log("no me cierro")
  //     } 
  // });
  //   return await modal.present();
  // }

  async modal_trasteos(){
    const modal = await this.modalCtrl.create({
      component: TrasteosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_clasificados(){
    const modal = await this.modalCtrl.create({
      component: ClasificadosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_directorio(){
    const modal = await this.modalCtrl.create({
      component: DirectorioPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_finanzas(){
    const modal = await this.modalCtrl.create({
      component: FinanzasPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_encuestas(){
    const modal = await this.modalCtrl.create({
      component: EncuestasPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_beneficios(){
    const modal = await this.modalCtrl.create({
      component: BeneficiosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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



  async modal_seguridad(){
    const modal = await this.modalCtrl.create({
      component: SeguridadPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_preguntas(){
    const modal = await this.modalCtrl.create({
      component: PreguntasPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_acceso(){
    const modal = await this.modalCtrl.create({
      component: AccesoPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_eventos(){
    const modal = await this.modalCtrl.create({
      component: EventosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async modal_citofonia(){
    const modal = await this.modalCtrl.create({
      component: CitofoniaPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.tower
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

  async perfil(){
    const modal = await this.modalCtrl.create({
      component: PerfilPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        email: this.current_user_email,
        rol: this.current_user_rol,
        apto: this.current_user_apto,
        image_url: this.current_user_image
      }
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log("esta es la data que devuelve el modal")
      console.log(data)
      var closing = data['data'];
      if (closing) {
        console.log("volvi de perfil con bandera en true",closing)
       // this.modalCtrl.dismiss()
      }else{
        console.log("Volvi con bandera en false,", closing)
      } 
  });
    return await modal.present();
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }



  delete(){
    localStorage.setItem("last","");
    this.fbs.delete_doc("user/"+this.current_user_uid+"/proyectos", this.proyecto).then(() => {
      console.log("proyecto borrado: ", this.proyecto)
    //  this.dismiss();
      // Actualizar la lista completa
      //this.consultar_lista_servicios();
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/usuarios", this.current_user_name).then(() => {
      console.log("Usuario borrado del proeycto: ", this.current_user_name)
    //  this.dismiss();
      // Actualizar la lista completa
      //this.consultar_lista_servicios();
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
  }
}


