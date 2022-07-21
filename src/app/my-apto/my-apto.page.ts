import { Component, OnInit } from '@angular/core';
//import Swiper from 'swiper';
import Swiper, { Navigation, Pagination } from 'swiper';
import { ModalController } from "@ionic/angular";
import { MascotasPage } from "../mascotas/mascotas.page";
import { VehiculosPage } from "../vehiculos/vehiculos.page";
import { TrabajadoresPage } from "../trabajadores/trabajadores.page";
import { AutorizacionesPage } from "../autorizaciones/autorizaciones.page";
import { FirestoreService } from "../firestore.service";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

import { isEmpty } from 'rxjs/operators';  

@Component({
  selector: 'app-my-apto',
  templateUrl: './my-apto.page.html',
  styleUrls: ['./my-apto.page.scss'],
})
export class MyAptoPage implements OnInit {


  mascotas: Observable<any[]>;
  link_mascotas: AngularFirestoreCollection;
  vehiculos: Observable<any[]>;
  link_vehiculos: AngularFirestoreCollection;
  trabajadores: Observable<any[]>;
  link_trabajadores: AngularFirestoreCollection;

  personal_service = [
    {nombre: "Avisos y Autorizaciones",
    icon: "checkmark-outline"},
    {nombre: "Familia",
    icon: "people-outline"},
    {nombre: "Histórico Transaccional",
    icon: "cash-outline"}
  ]
  
  uid;
  nombre;
  proyecto;
  torre;
  apto;

  no_apto: boolean;

  constructor(private modalCtrl: ModalController, private fbs: FirestoreService,private db: AngularFirestore) { }

  ngOnInit() {
  
  }

  ionViewWillEnter(){
        // this.initiate_swiper()
        this.proyecto = localStorage.getItem("last")
        this.nombre = localStorage.getItem("nombre")
        this.torre = localStorage.getItem("torre")
        this.apto = localStorage.getItem("apto")
        this.uid = localStorage.getItem("uid")
        console.log("datos: ", this.nombre, this.proyecto,this.torre,this.apto)
        if (this.torre === 'undefined' || this.torre === "") {
          console.log("no tiene asignado torre")
          this.torre = "";
          this.no_apto = true;
        }else{
          this.no_apto = false;
        }
        if (this.apto === 'undefined' || this.torre === "") {
          this.apto = "";
        console.log("no tiene asignado apto")
        this.no_apto = true;
        }else{
          this.no_apto = false;
        }
        if (!this.no_apto) {
        this.get_user_favs();
        }  
  }

  get_user_favs(){
    this.link_mascotas = this.db.collection('user/'+this.uid+'/proyectos/'+this.proyecto+'/mascotas')
        this.mascotas = this.link_mascotas.valueChanges();
        this.link_vehiculos = this.db.collection('user/'+this.uid+'/proyectos/'+this.proyecto+'/vehiculos')
        this.vehiculos = this.link_vehiculos.valueChanges();
        this.link_trabajadores = this.db.collection('user/'+this.uid+'/proyectos/'+this.proyecto+'/trabajadores')
        this.trabajadores = this.link_trabajadores.valueChanges();
        console.log(this.vehiculos)
        console.log(this.mascotas)
        console.log(this.trabajadores)
        if (this.vehiculos.pipe(isEmpty(),)){
          console.log("entre y no se porque")
        }
        if (!this.mascotas){
          console.log("esos observables si")
        }    
      }
  open_info_modal(nombre){
    console.log(nombre)
  }

  initiate_swiper(){
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'vertical',
      loop: true,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  // get_mascotas(){
  //   console.log(this.uid,this.proyecto,this.apto,this.torre)
  //   this.fbs.consultar("/user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas").subscribe((servicios) => {
  //     this.mascotas = [];
  //     console.log("banderaaaaaaaaaa",this.mascotas)
  //     servicios.forEach((datosTarea: any) => {
  //       this.mascotas.push({
  //         id: datosTarea.payload.doc.id,
  //         data: datosTarea.payload.doc.data()
  //       });
  //     })
  //     //this.password = this.lista_proyectos.data.key
  //     console.log("traigamos la lista de comunicados")
  //     console.log(this.mascotas)
  //   });   
  // }

  
elegir_servicio(servicio){
      console.log("elegiste el servicio: ", servicio)
      // console.log("Vamos a elegir que ventana abrir dependiendo del servicio oprimido, este es el servicio: " + servicio)
        if (servicio == "Avisos y Autorizaciones") {
        // console.log("reservas if")
          this.modal_autorizaciones();
        // this.modalCtrl.dismiss();
        }
        if (servicio == "Familia") {
        // console.log("Pago admin if")
          //this.modal_mascotas();
        }
        if (servicio == "Pagos") {
          // console.log("Pago admin if")
            //this.modal_mascotas();
          }
    }

  async modal_mascotas(){
    console.log("mascotas")
    const modal = await this.modalCtrl.create({
      component: MascotasPage,
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

  async modal_trabajadores(){
    const modal = await this.modalCtrl.create({
      component: TrabajadoresPage,
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

  async modal_vehiculos(){
    const modal = await this.modalCtrl.create({
      component: VehiculosPage,
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

  async modal_autorizaciones(){
    const modal = await this.modalCtrl.create({
      component: AutorizacionesPage,
      cssClass: 'adding_modal',
      componentProps: {
        // uid: this.uid,
        // nombre: this.nombre,
        // proyecto: this.proyecto,
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

}
