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
//import { NotificationsComponent } from '../notifications/notifications.component';
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
import { VotacionesPage } from "../votaciones/votaciones.page";
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @Input() uid
  @Input() nombre
  @Input() email
  @Input() imageURL
  @Input() proyecto
  
  // @Input() reserva
  // @Input() pagos
  // @Input() comunicado
  // @Input() documento
  // @Input() monitoreo
  // @Input() emergencia

  reserva :boolean
  pagos :boolean
  comunicado :boolean 
  documento :boolean 
  monitoreo :boolean
  aircall: boolean
  emergencia: boolean 

  profile_image_yes: boolean;
  account_config_ok: Boolean;

admin_email;
admin_name;

//   emergencias:boolean = true;

  // reservas:string;
  // pagos:string;
  // comunicados:string;
  // documentos:string;
  // monitoreo: string;

  proyect_services: any = {
    id: "",
    data: {}
};

app: any = {
  id: "",
  data: {}
};

// torres: any = {
//   id: "",
//   data: {}
// }
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
  slidesPerView: 1.4,
  centeredSlides: true,
  loop: false,
  spaceBetween: 10,
  autoplay:true,
}

show: boolean
show_services: boolean

name: any 


 // Servicios_np : any = this.Servicios_np

 constructor(private emailComposer: EmailComposer,public alertController: AlertController,public  router: Router,private fbs: FirestoreService,private modalCtrl: ModalController ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) {
}

  servicios = [ 
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

    {"nombre":"Preguntas y Respuestas",
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

    {"nombre":"Emergencias 24/7",
    "descripcion":"Contacto directo con el Call-Center del ascensor",
    icon:"alert-circle-outline",
    "habilitado":true},

    {"nombre":"Acceso",
    "descripcion":"Utiliza el celular para ingresar a las torres",
    icon:"id-card-outline",
    "habilitado":true},

    {"nombre":"AirCall",
    "descripcion":"Controla el Ascensor",
    icon:"keypad-outline",
    "habilitado":true},

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

    // {"nombre":"Usuarios",
    // "descripcion":"Revisa que usuarios hacen parte del edificio",
    // icon:"people-outline",
    // "habilitado":true},
 ]

  ngOnInit() {
   // this.current_user_image = this.imageURL
   this.account_config_ok = true;
   this.profile_image_yes = true;
    console.log(this.imageURL)
  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
    //console.log("Aviso de incio de app, estos son los servicios del usuario: " + this.servicios )
    //console.log("servicio 1: " + this.servicios[0])
    //console.log(this.uid,this.nombre,this.proyecto,this.reserva,this.pagos,this.documento,this.comunicado,this.emergencia)
   // console.log(this.uid,this.nombre,this.proyecto)
   // console.log(this.proyect_services)
   this.get_torre()
   this.setApt = false;
    this.get_proyect_services()
    //this.getuseruid();
    //this.setStatus('¡Bienvenido! Escoge el carro');
    //this.className = 'clase1';
    console.log("Pruyeba de ver servisios y descrp: ", this.servicios)
  }

  async presentAlert(tittle,header,text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tittle,
      subHeader: header,
      message: text,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Avisar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
             let email = {
              app: "PROPY",
              from: this.email,
              to: this.admin_email,
              cc: '',
              subject: 'Rellena la información y envia este correo',
              body: 'Hola ' + this.nombre + '. <br><br> Por temas de seguridad, solicitamos a los administradores que verifiquen la información de los usuarios antes de asignarles su apartamento.<br><br> Para esto, necesitamos que llenes la siguiente información: <br><br> - Cédula propietario: <br> - Apartamento: <br> - Integrantes del apto (para inscribirlos también)<br><br> Una vez rellenes todos los datos envia este correo.',
              isHtml: true
            }
            this.emailComposer.open(email);
            //this.router.navigate(["inscripciones"])
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  return_flag(){
    this.modalCtrl.dismiss({
        activated: true
      })
  }

  // get_torre(){
  //   console.log("trayendo la torre!!")
  //   this.fbs.consultarPorId("user/"+this.uid+"/proyectos/", this.proyecto).subscribe((resultado) => {
  //     if (resultado.payload.data() != null) {
  //         this.torre.id = resultado.payload.id;
  //         this.torre.data = resultado.payload.data();
  //     }
  //     this.tower = this.torre.data.torre
  //     this.apto = this.torre.data.apto
  //     console.log("this.torre ",this.torre)
  //     if(this.apto){
  //       this.account_config_ok = true
  //     }else{
  //       this.account_config_ok = false;
  //     }
  //   })
  // }

  get_torre(){
    console.log("trayendo la torre!!")
    this.fbs.consultarPorId("Proyectos/"+this.proyecto+"/usuarios/", this.nombre).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.torre.id = resultado.payload.id;
          this.torre.data = resultado.payload.data();
      }
      this.tower = this.torre.data.torre
      this.apto = this.torre.data.apto
      this.habilitado = this.torre.data.habilitado
      console.log("this.habilitado ",this.habilitado)
      if(this.apto){
        this.account_config_ok = true
      }else{
        this.account_config_ok = false;
      }
    })
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

  get_aptos(){
    this.fbs.consultar("Proyectos/"+this.proyecto+"/apartamentos/"+this.torr+"/aptos").subscribe((servicios) => {
      servicios.forEach((datosTarea: any) => {
        this.aptos.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de aptos e inquilino")
      console.log(this.aptos,this.inquilino)
    });
  }

  set_apt(){
    console.log("open apto setting")
    this.get_torres();
      this.setApt = true;
  }

  close_timepicker(){
    this.setApt = false;
    this.torres = [];
    this.aptos = [];
  }

  set_apto(){
    this.fbs.consultarPorId("Proyectos/"+this.proyecto+"/apartamentos/"+this.torr+"/aptos", this.apt).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.app.id = resultado.payload.id;
          this.app.data = resultado.payload.data();
      }
      this.inquilino = this.app.data.inquilino;
      console.log("pude armar al inquilino., ", this.inquilino)
    })
    
  }

  save_apto(){
    if (this.inquilino === this.nombre) {
      const res = confirm("Enviar este apartamento: "+ this.torr + " " + this.apt + "?");
    if(res){
      this.tower = this.torr;
      this.apto = this.apt;
      console.log("esta torre y apto:---> ",  this.torre , this.apto)
      this.fbs.insertar("Proyectos/"+this.proyecto+"/usuarios/"+this.tower+"/aptos/"+this.apto+"/habitantes/",this.nombre,{"nombre": this.nombre})
      this.fbs.insertar("Proyectos/"+this.proyecto+"/usuarios/"+this.tower+"/aptos/"+this.apto+"/habitantes/",this.nombre,{"habilitado": false})
      this.fbs.update("Proyectos/"+this.proyecto+"/usuarios/"+this.tower+"/aptos/",this.apto,{"torre": this.tower})
      this.fbs.update("Proyectos/"+this.proyecto+"/usuarios/"+this.tower+"/aptos/",this.apto,{"apto": this.apto})
      
      this.fbs.update("user/"+this.uid+"/proyectos/",this.proyecto,{"torre": this.tower})
      this.fbs.update("user/"+this.uid+"/proyectos/",this.proyecto,{"apto": this.apto})
      this.setApt = false;
      this.account_config_ok = false;
      this.aptos = [];
      this.torres = [];
      this.close_timepicker();
     this.presentAlert('Enviar Email de Aviso',"El administrador debe habilitar tu cuenta","¿Enviar solicitud al administrador para que me asigne mi apartamento basado en los datos que daré a continuación?")
    }
    } else {
      alert("Tu nombre no esta registrado como inquilino de este apartamento, asegurate de elegir el tuyo")
    }
  }

  get_proyect_services(){
      this.fbs.consultarPorId("Proyectos/", this.proyecto).subscribe((resultado) => {
        if (resultado.payload.data() != null) {
            this.proyect_services.id = resultado.payload.id;
            this.proyect_services.data = resultado.payload.data();
        }
        if (this.proyect_services.id=="") {
          this.show = true;
          this.show_services = false;
          this.emergencia = false;
        }else{
          this.show = false;
          this.show_services = true;
          this.emergencia = true;
        }
        console.log("dataa larga: ")
        console.log(this.proyect_services)
        // Reservas, AirCall, Comunicados, Mascotas, Aviso de trasteo, Directorio, Autorizaciones, Preguntas, Emergencia Ascensor, Eventos
// Documentos, Clasificados, Encuestas, Controles de Acceso
// Pagos, Monitoreo, Finanzas, Beneficios, Seguridad, Citofonia

for (let i = 0; i < this.servicios.length; i++) {
  var name = this.servicios[i].nombre
  
   this.servicios[i].habilitado = this.proyect_services.data.name;
}

        this.servicios[0].habilitado = this.proyect_services.data.reservas;
        this.servicios[1].habilitado = this.proyect_services.data.votaciones;
        this.servicios[2].habilitado = this.proyect_services.data.comunicados;
        this.servicios[3].habilitado = this.proyect_services.data.directorio;
        this.servicios[4].habilitado = this.proyect_services.data.preguntas;
        this.servicios[5].habilitado = this.proyect_services.data.eventos;
        this.servicios[6].habilitado = this.proyect_services.data.beneficios;
        this.servicios[7].habilitado = this.proyect_services.data.documentos;
        this.servicios[8].habilitado = this.proyect_services.data.clasificados;
        this.servicios[9].habilitado = this.proyect_services.data.encuestas;
        this.servicios[10].habilitado = this.proyect_services.data.finanzas;
        this.servicios[11].habilitado = this.proyect_services.data.pagos;
        this.servicios[12].habilitado = this.proyect_services.data.emergencias;
        this.servicios[13].habilitado = this.proyect_services.data.acceso;
        this.servicios[14].habilitado = this.proyect_services.data.aircall;
       // this.servicios14].habilitado = false;
        this.servicios[15].habilitado = this.proyect_services.data.autorizaciones;
        this.servicios[16].habilitado = this.proyect_services.data.mascotas;
        this.servicios[17].habilitado = this.proyect_services.data.trasteo;
        this.servicios[18].habilitado = this.proyect_services.data.monitoreo;
        this.servicios[19].habilitado = this.proyect_services.data.seguridad;
        this.servicios[20].habilitado = this.proyect_services.data.citofonia;
        this.admin_email = this.proyect_services.data.admin_email;
        this.admin_name = this.proyect_services.data.admin_name;
        console.log("auth: ", this.servicios[13])
        console.log("auth: ", this.proyect_services.data)
        //this.emergencia = true;
       // console.log(this.uid,this.nombre,this.proyecto,this.reserva,this.pagos,this.documento,this.comunicado,this.aircall,this.emergencia)
      //  // this.consultar_lista_servicios()
      //   console.log("usuario: ",this.reservas,this.pagos,this.comunicados,this.documentos)
    });
  }

  async modal_info(url){
    const modal = await this.modalCtrl.create({
      component: InfoPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
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
    if (!this.habilitado) {
      alert("No estás habilitado para utilizar la APP, contacta a tu Administrador para mas información")
    }else{

    if (!this.apto) {
      alert("Debes estar inscrito a un apartamento para comenzar a usar los servicios, si todavia no tienes asignado un apartamento contacta al administrador")
    }else{
    if(!habilitado){
      alert("Este servicio es para miembros GOLD, contactanos para activar tu plan (El administrador de este edificio no tiene activo este servicio)")
    }else{
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
        if (servicio == "Ingreso Mascotas") {
          console.log("Mascotas");
          this.modal_mascotas();
        }
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
        if (servicio == "Autorizaciones") {
          console.log("Autorizar");
          this.modal_autorizaciones();
        }
        if (servicio == "Seguridad") {
          console.log("Seguridad");
          this.modal_seguridad();
        }
        if (servicio == "Preguntas y Respuestas") {
          console.log("QA");
          this.modal_preguntas();
        }
        if (servicio == "Emergencias 24/7") {
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
    }
  }
   }
  }

  async modal_emergencias(){
    const modal = await this.modalCtrl.create({
      component: EmergenciasPage,
      cssClass: 'emergencias_modal',
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

  async modal_aircall(){
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

  async modal_usuarios(){
    const modal = await this.modalCtrl.create({
      component: UsuariosPage,
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

  async modal_monitoreo(){
    const modal = await this.modalCtrl.create({
      component: MonitoreoPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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

  async modal_reservas(){
    const modal = await this.modalCtrl.create({
      component: ReservasPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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

  async modal_mascotas(){
    const modal = await this.modalCtrl.create({
      component: MascotasPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
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

  async modal_trasteos(){
    const modal = await this.modalCtrl.create({
      component: TrasteosPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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

  async modal_autorizaciones(){
    const modal = await this.modalCtrl.create({
      component: AutorizacionesPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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
        uid: this.uid,
        nombre: this.nombre,
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

  dismiss(){
    this.modalCtrl.dismiss();
  }

  delete(proyecto){
    this.fbs.delete_doc("user/"+this.uid+"/proyectos", proyecto).then(() => {
      console.log("proyecto borrado")
      this.dismiss();
      // Actualizar la lista completa
      //this.consultar_lista_servicios();
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
  }
}


