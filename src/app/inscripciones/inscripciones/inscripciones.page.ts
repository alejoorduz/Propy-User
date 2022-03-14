import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController,AlertController } from "@ionic/angular";
import { InscribirseModalPage } from "../../inscripciones/inscribirse-modal/inscribirse-modal.page";
import { InicioPage } from "../../inicio/inicio.page";
//import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { FirestoreService } from '../../firestore.service';
import { AuthService } from '../../auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router, NavigationExtras } from "@angular/router";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as $ from "jquery";
import { PerfilPage } from "../../perfil/perfil.page";

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

  option = {
    slidesPerView: 1.4,
    centeredSlides: true,
    loop: false,
    spaceBetween: 5,
    autoplay:true,
 }

  reservas:string;
  pagos:string;
  comunicados:string;
  documentos:string;
  aircall:string;

  lista_servicio = [];
  lista_proyectos = [];
  array_servicios_admin: string

  new_user: boolean;
  activate_account: boolean;
  show_delete_button: boolean = false;

  current_user_uid;
  current_user_name;
  current_user_email;
  current_user_rol;
  current_user_activate;
  
  constructor(private alertCtrl: AlertController,private geolocation: Geolocation, public  router: Router,private modalCtrl: ModalController,private storage: Storage,private fbs: FirestoreService ,private authSvc: AuthService,public afAuth:AngularFireAuth, private afs: AngularFirestore) { }

  proyecto:string;

  lat;
  long;

  WeatherData:any = {
    main : {},
    isDay: true
  };

  wind_speed;

  day_mood: string;

  services: any = {
    id: "",
    data: {}
};

  user_info: any = {
    id: "",
    data: {}
};

  ngOnInit() {
  }

    ionViewWillEnter() {
    // this.storage.create();
    // this.storage.get('servicio 1').then(res=>{
    //   console.log(res)
    // })
    this.getuseruid();
    this.getLocation();
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
       this.lat = resp.coords.latitude;
       this.long = resp.coords.longitude;
       console.log("lat: " + this.lat + "   long: " + this.long)
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

  async presentAlert(servicio) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Estas seguro?',
      subHeader: 'Estas a punto de desuscribirte de ' + servicio,
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
            this.delete(servicio)
          }
        }
      ]
    });
    await alert.present();

  // const { role } = await alert.onDidDismiss();
  // console.log('onDidDismiss resolved with role', role);
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

  async getuseruid(){
    let uid = await (await this.afAuth.currentUser).uid
    this.current_user_uid = uid
    this.getName(uid);
  }
  
  async getName(uid){
    this.fbs.consultarPorId("user/", uid).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.user_info.id = resultado.payload.id;
          this.user_info.data = resultado.payload.data();
      }
      this.current_user_name = this.user_info.data.displayName;
      this.current_user_email = this.user_info.data.email;
      this.current_user_rol = this.user_info.data.rol;
      this.current_user_activate = this.user_info.data.habilitado
      console.log("el usuario esta activado? :",this.current_user_activate)
      //let edificio = this.user_info.data.proyecto
      this.consultar_proyectos()
      //console.log("usuario: ",name,email,this.proyecto)
  });
  }

  consultar_proyectos(){

    if (this.current_user_activate === false) {
      console.log("non activated false: ", this.current_user_activate)
      this.activate_account = false; 
      this.new_user = false;
    } else {
      console.log("activated")
      this.activate_account = true; 
       console.log()
      this.fbs.consultar("user/"+this.current_user_uid+"/proyectos").subscribe((servicios) => {
        this.lista_servicio = [];
        servicios.forEach((datosTarea: any) => {
          this.lista_servicio.push({
            id: datosTarea.payload.doc.id,
            data: datosTarea.payload.doc.data()
          });
        })
        console.log("lista de servicios: " , this.lista_servicio)
         if (this.lista_servicio.length === 0) { 
        console.log("usuario nuevo sin negocio")
        this.new_user = true;      
      } else {
        this.new_user = false;
        console.log("usuario nuevo viejo")
      }
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

  // consultar_lista_servicios(){
  //   console.log()
  //   this.fbs.consultar("Admins/"+this.current_user_uid+"/proyectos").subscribe((servicios) => {
  //     this.lista_servicio = [];
  //     servicios.forEach((datosTarea: any) => {
  //       this.lista_servicio.push({
  //         id: datosTarea.payload.doc.id,
  //         data: datosTarea.payload.doc.data()
  //       });
  //     })
  //     console.log(this.lista_servicio)
  //   });
  // }

  // ionViewDidEnter() {
  //   //PRIMERO SE LEE LA BASE DE DATOS Y SE BUSCA SI YA EXISTEN SERVICIOS Y SE DESPLIEGAN
  //   //console.log("se guardo la prueba en local storage")
  //   this.storage.create();
  //  // localStorage.setItem("servicios",JSON.stringify(this.servicios_reservas));
  //   //this.setStatus('¡Bienvenido! Escoge el carro');
  // }

  elegir_servicio(){
 // this.array_servicios_admin = localStorage.getItem("servicios")
 // console.log("Este es el dato: " + this.array_servicios_admin)
  console.log("abrir modal con adicionar servicios: " ,)
  this.abrirmodal()
  }

  
  async perfil(){
    const modal = await this.modalCtrl.create({
      component: PerfilPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        email: this.current_user_email,
        rol: this.current_user_rol
      }
    });
    modal.onDidDismiss()
    .then((data) => {
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
        nombre: this.current_user_name
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

  async modal_proyecto(id,reserva,pago,comunicados,documentos,monitoreo,aircall,emergencia){
    console.log(id,reserva,pago)
    const modal = await this.modalCtrl.create({
      component: InicioPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.current_user_uid,
        nombre: this.current_user_name,
        proyecto: id,
        reserva: reserva,
        pagos: pago,
        comunicado :comunicados,
        documento: documentos,
        monitoreo: monitoreo,
        aircall: aircall,
        emergencias: emergencia
      }
    });
    modal.onDidDismiss()
    .then((data) => {
        //   this.storage.forEach((value, key, index) => {
        //   console.log(`ITEM - ${key} = ${value} [${index}]`);
        // });
      
  });
    return await modal.present();
  }

   cerrarsesion(){
      this.authSvc.logout();
      this.router.navigate(["/iniciosesion"])
    }

    show_delete(){
      if (this.show_delete_button) {
        this.show_delete_button = false;
        $(".show_delete").css('color', 'black');
      } else {
        this.show_delete_button = true;
        $(".show_delete").css('color', 'orange');
      }
    }

    delete(proyecto){
      this.fbs.delete_doc("user/"+this.current_user_uid+"/proyectos", proyecto).then(() => {
        console.log("proyecto borrado")
      })
      this.fbs.delete_doc("Proyectos/"+proyecto+"/usuarios", this.current_user_name).then(() => {
        console.log("usuario borrado")
      })
    }

}
