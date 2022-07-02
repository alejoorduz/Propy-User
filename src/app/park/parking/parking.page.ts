import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
//import { AddingModalPage } from "../adding-modal/adding-modal.page";
//import { IonicStorageModule } from '@ionic/storage-angular';
 import { Storage } from '@ionic/storage-angular';
 import { FirestoreService } from '../../firestore.service';
 import { Router } from '@angular/router';
import { OfrecerSpotPage } from "../ofrecer-spot/ofrecer-spot.page";
import { BuscarSpotPage } from "../buscar-spot/buscar-spot.page";
import { MisSpotsPage } from "../mis-spots/mis-spots.page";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
})
export class ParkingPage implements OnInit {

  option = {
    slidesPerView: 1.4,
    centeredSlides: true,
    loop: false,
    spaceBetween: 10,
    autoplay:true,
 }

  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre

  servicio: string;
  hora_inicial:number;
  hora_final:number;
  max_reserva:number;
  hora_restringida: number
  periodo:number;
  lunes:boolean;
  lun: number;
  martes:boolean;
  mar: number;
  miercoles:boolean;
  mierc: number;
  jueves:boolean;
  juev: number;
  viernes:boolean;
  vier: number;
  sabado:boolean;
  sab: number;
  domingo:boolean;
  dom: number;

  lista_servicio = [
    {"nombre":"Mis SPOTS",
    // "descripcion":"Directorio telefonico",
    icon:"book-outline",
    "habilitado":true},

    {"nombre":"Ofrecer SPOT",
    // "descripcion":"Directorio telefonico",
    icon:"ticket-outline",
    "habilitado":true},

    {"nombre":"Buscar SPOT",
    // "descripcion":"Directorio telefonico",
    icon:"search-outline",
    "habilitado":true},
  ];
  array_servicios_admin: string
  
  constructor(public router: Router, private modalCtrl: ModalController,private storage: Storage,private firestoreService: FirestoreService) { }

  ngOnInit() {
    console.log("torre: ", this.torre)
  }

   ionViewWillEnter() {
   this.storage.create();
    // this.storage.get('servicio 1').then(res=>{
    //   console.log(res)
    // })
   // this.consultar_lista_servicios()

  }

  consultar_lista_servicios(){
    // console.log("mas datros---< ", this.uid, this.nombre,this.proyecto,this.torre)
    // this.firestoreService.consultar("Proyectos/"+this.proyecto+"/Servicios").subscribe((lista) => {
    //   this.lista_servicio = [];
    //   lista.forEach((datosTarea: any) => {
    //     this.lista_servicio.push({
    //       id: datosTarea.payload.doc.id,
    //       data: datosTarea.payload.doc.data()
    //     });
    //   })
    //   //console.log(this.lista_servicio)
    // });
  }

  open_modal(servicio){
    console.log(servicio)
    if (servicio === "Ofrecer SPOT") {
      this.modal_ofrecer();
    }
    if (servicio === "Buscar SPOT") {
      this.modal_buscar();
    }
    if (servicio === "Mis SPOTS") {
      this.my_spots();
    }
  }

  async my_spots(){
    const modal = await this.modalCtrl.create({
      component: MisSpotsPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.torre
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

  async modal_buscar(){
    const modal = await this.modalCtrl.create({
      component: BuscarSpotPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.torre
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

  async modal_ofrecer(){
    const modal = await this.modalCtrl.create({
      component: OfrecerSpotPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        apto: this.apto,
        torre: this.torre
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

  save_for_calendar(data){
    console.log("saving data for displaying the calendar", data.data.hora_restringida)
    this.servicio = data.id 
    this.hora_inicial = data.data.horainicial
    this.hora_final = data.data.horafinal
    this.max_reserva = data.data.maxreserva
    this.hora_restringida = data.data.hora_restringida
    console.log("horas restringidas: ", this.hora_restringida)
    this.periodo = data.data.periodo
    this.lunes = data.data.lunes
    this.martes = data.data.martes
    this.miercoles = data.data.miercoles
    this.jueves = data.data.jueves
    this.viernes = data.data.viernes
    this.sabado = data.data.sabado
    this.domingo = data.data.domingo
    if (this.domingo) {
      this.dom = 11      
    }else{
      this.dom = 0
    }
    if (this.lunes) {
      this.lun = 11     
    }else{
      this.lun = 1
    }
    if (this.martes) {
      this.mar = 11     
    }else{
      this.mar = 2
    }
    if (this.miercoles) {
      this.mierc = 11      
    }else{
      this.mierc = 3
    }
    if (this.jueves) {
      this.juev = 11     
    }else{
      this.juev = 4
    }
    if (this.viernes) {
      this.vier = 11      
    }else{
      this.vier = 5
    }
    if (this.sabado) {
      this.sab = 11      
    }else{
      this.sab = 6
    }
    this.router.navigate(['calendar'], {
      state: {
         proyecto: this.proyecto,
         servicio: this.servicio,
         periodo: this.periodo,
         hora_inicial: this.hora_inicial,
         hora_final: this.hora_final,
         max_reserva: this.max_reserva,
         hora_restringida: this.hora_restringida,
         lunes: this.lun,
         martes: this.mar,
         miercoles: this.mierc,
         jueves: this.juev,
         viernes: this.vier,
         sabado: this.sab,
         domingo: this.dom,
         apto: this.apto,
         torre: this.torre
      }
   });
    this.modalCtrl.dismiss(true)
  }

  elegir_servicio(data){
 // this.array_servicios_admin = localStorage.getItem("servicios")
 // console.log("Este es el dato: " + this.array_servicios_admin)
//   console.log("abrir modal con adicionar servicios: " , data.id , data.data)
//   this.hora_inicial = data.data.horainicial
//   this.hora_final = data.data.horafinal
//   this.hora_reserva = data.data.horareserva
//   this.periodo = data.data.periodo
//   this.lunes = data.data.lunes
//   this.martes = data.data.martes
//   this.miercoles = data.data.miercoles
//   this.jueves = data.data.jueves
//   this.viernes = data.data.viernes
//   this.sabado = data.data.sabado
//   this.domingo = data.data.domingo
//   this.dias_reserva = data.data.diasreserva
// // console.log(this.hora_inicial,this.hora_final,this.hora_reserva,this.lunes,this.jueves)
//   this.abrirmodal()
  }

  async abrirmodal(){
  //   const modal = await this.modalCtrl.create({
  //     component: AddingModalPage,
  //     cssClass: 'adding_modal',
  //     componentProps: {
  //       hora_inicial: this.hora_inicial,
  //       hora_final: this.hora_final,
  //       hora_reserva: this.hora_reserva,
  //       dias_reserva: this.dias_reserva,
  //       lunes: this.lunes,
  //       martes: this.martes,
  //       miercoles: this.miercoles,
  //       jueves: this.jueves,
  //       viernes: this.viernes,
  //       sabado: this.sabado,
  //       domingo: this.domingo
      
  //     }
  //   });
  //   modal.onDidDismiss()
  //   .then((data) => {
  //       //   this.storage.forEach((value, key, index) => {
  //       //   console.log(`ITEM - ${key} = ${value} [${index}]`);
  //       // });
      
  // });
  //   return await modal.present();
  }
  
  dismiss(){
    this.modalCtrl.dismiss(false);
  }
}
