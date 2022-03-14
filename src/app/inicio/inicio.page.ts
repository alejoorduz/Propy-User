import { Component, OnInit, Input} from '@angular/core';
import { Servicios_np } from '../servicios/servicios-np'
import { Router, NavigationExtras } from "@angular/router";
import { AuthService } from '../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { FirestoreService } from "../firestore.service";
import { ModalController } from "@ionic/angular";

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

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @Input() uid
  @Input() nombre
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

 constructor(public alertController: AlertController,public  router: Router,private fbs: FirestoreService,private modalCtrl: ModalController ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) {
}

servicios = [ 
  {"nombre":"Reservas",
  "descripcion":"Gestiona tus reservas",
  "icon":"calendar-outline",
  "habilitado":true},

  {"nombre":"AirCall",
  "descripcion":"Controla el Ascensor",
  icon:"keypad-outline",
  "habilitado":true},

  {"nombre":"Comunicados",
  "descripcion":"Lee comunicados importantes",
  icon:"newspaper-outline",
  "habilitado":true},

  {"nombre":"Ingreso Mascotas",
  "descripcion":"Temas relacionados con tu mascota",
  icon:"paw-outline",
  "habilitado":true},

  {"nombre":"Avisos de trasteo",
  "descripcion":"Rellena el formulario de aviso para trasteos",
  icon:"construct-outline",
  "habilitado":true},

  {"nombre":"Directorio",
  "descripcion":"Directorio telefonico",
  icon:"call-outline",
  "habilitado":true},

  {"nombre":"Autorizaciones",
  "descripcion":"Formulario para autorizaciones",
  icon:"checkmark-outline",
  "habilitado":true},

  {"nombre":"Preguntas y Respuestas",
  "descripcion":"Resuelve tus dudas",
  icon:"information-outline",
  "habilitado":true},

  {"nombre":"Emergencias 24/7",
  "descripcion":"Contacto directo con el Call-Center del ascensor",
  icon:"alert-circle-outline",
  "habilitado":true},

  {"nombre":"Eventos",
  "descripcion":"Revisa los proximos eventos del edificio",
  icon:"calendar-number-outline",
  "habilitado":true},

  {"nombre":"Usuarios",
  "descripcion":"Revisa que usuarios hacen parte del edificio",
  icon:"people-outline",
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

  {"nombre":"Acceso",
  "descripcion":"Utiliza el celular para ingresar a las torres",
  icon:"id-card-outline",
  "habilitado":true},

  {"nombre": "Pagos",
  "descripcion":"Accede al link de pago",
  icon:"cash-outline",
  "habilitado":true},

  {"nombre":"Monitoreo",
  "descripcion":"Monitorea en tiempo real datos obtenidos",
  icon:"eye-outline",
  "habilitado":true},

  {"nombre":"Finanzas",
  "descripcion":"Revisa los archivos de presupuestos",
  icon:"bar-chart-outline",
  "habilitado":true},
  
  {"nombre":"Beneficios",
  "descripcion":"Accede a beneficios",
  icon:"diamond-outline",
  "habilitado":true},

  {"nombre":"Seguridad",
  "descripcion":"Revisa los temas de seguridad",
  icon:"shield-half-outline",
  "habilitado":true},

  {"nombre":"Citofonia",
  "descripcion":"Controla la entrada de visitantes",
  icon:"volume-high-outline",
  "habilitado":true}
]

  ngOnInit() {
  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
    //console.log("Aviso de incio de app, estos son los servicios del usuario: " + this.servicios )
    //console.log("servicio 1: " + this.servicios[0])
    //console.log(this.uid,this.nombre,this.proyecto,this.reserva,this.pagos,this.documento,this.comunicado,this.emergencia)
   // console.log(this.uid,this.nombre,this.proyecto)
   // console.log(this.proyect_services)
    this.get_proyect_services()
    //this.getuseruid();
    //this.setStatus('¡Bienvenido! Escoge el carro');
    //this.className = 'clase1';
    console.log("Pruyeba de ver servisios y descrp: ", this.servicios)
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
        this.servicios[0].habilitado = this.proyect_services.data.reservas;
        this.servicios[1].habilitado = this.proyect_services.data.aircall;
        this.servicios[2].habilitado = this.proyect_services.data.comunicados;
        this.servicios[3].habilitado = this.proyect_services.data.mascotas;
        this.servicios[4].habilitado = this.proyect_services.data.trasteo;
        this.servicios[5].habilitado = this.proyect_services.data.directorio;
        this.servicios[6].habilitado = this.proyect_services.data.autorizaciones;
        this.servicios[7].habilitado = this.proyect_services.data.preguntas;
        this.servicios[8].habilitado = this.proyect_services.data.emergencias;
        this.servicios[9].habilitado = this.proyect_services.data.eventos;
        this.servicios[10].habilitado = true;
        this.servicios[11].habilitado = this.proyect_services.data.documentos;
        this.servicios[12].habilitado = this.proyect_services.data.clasificados;
        this.servicios[13].habilitado = this.proyect_services.data.encuestas;
        this.servicios[14].habilitado = this.proyect_services.data.acceso;
        this.servicios[15].habilitado = this.proyect_services.data.pagos;
        this.servicios[16].habilitado = this.proyect_services.data.monitoreo;
        this.servicios[17].habilitado = this.proyect_services.data.finanzas;
        this.servicios[18].habilitado = this.proyect_services.data.beneficios;
        this.servicios[19].habilitado = this.proyect_services.data.seguridad;
        this.servicios[20].habilitado = this.proyect_services.data.citofonia;
        // this.servicios[20].habilitado = this.proyect_services.data.autorizaciones;
        // this.servicios[21].habilitado = this.proyect_services.data.autorizaciones;
        console.log("auth: ", this.servicios[13])
        console.log("auth: ", this.proyect_services.data)
        //this.emergencia = true;
       // console.log(this.uid,this.nombre,this.proyecto,this.reserva,this.pagos,this.documento,this.comunicado,this.aircall,this.emergencia)
      //  // this.consultar_lista_servicios()
      //   console.log("usuario: ",this.reservas,this.pagos,this.comunicados,this.documentos)
    });
  }



  elegir_servicio(servicio){
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

  // async getuseruid(){
  //   let uid = await (await this.afAuth.currentUser).uid
  //   this.getName(uid);
  // }
  
  
  // async getName(uid){
  //   this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
  //     if (resultado.payload.data() != null) {
  //         this.user_info.id = resultado.payload.id;
  //         this.user_info.data = resultado.payload.data();
  //     }
  //     this.name = this.user_info.data.displayName;
  //     let email = this.user_info.data.email;
  //     let saldo = this.user_info.data.saldo;
  //     console.log("usuario: ",this.name,email,saldo)
  // });
  // }

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


