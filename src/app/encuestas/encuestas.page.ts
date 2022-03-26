import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { OpenLinkPage } from '../open-link/open-link.page';


@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  constructor(private iab: InAppBrowser,private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto

  nombre_numero;
  numero;
 
  numeros = [];
  comunicados  = [

    {"titulo":"Linea de Emergencia",
    "subtitulo":"123",
    "icon":"call-outline"},

    {"titulo":"Policia Nacional",
    "subtitulo":"112",
    "icon":"call-outline"},

    {"titulo":"Policia de Tránsito",
    "subtitulo":"127",
    "icon":"call-outline"},

    {"titulo":"Defensa Civil",
    "subtitulo":"144",
    "icon":"call-outline"},

    {"titulo":"Bomberos",
    "subtitulo":"119",
    "icon":"call-outline"},

    {"titulo":"Cruz Roja",
    "subtitulo":"132",
    "icon":"call-outline"},

    {"titulo":"Ambulancias",
    "subtitulo":"125",
    "icon":"call-outline"},

    {"titulo":"Gaula",
    "subtitulo":"165",
    "icon":"call-outline"},

    {"titulo":"Atención Desastres",
    "subtitulo":"111",
    "icon":"call-outline"},

    {"titulo":"Violencia a Mujeres",
    "subtitulo":"155",
    "icon":"call-outline"},

    {"titulo":"DirecTv",
    "subtitulo":"6015185656",
    "icon":"call-outline"},

    {"titulo":"Vanti",
    "subtitulo":"6013078121",
    "icon":"call-outline"},

    {"titulo":"ETB",
    "subtitulo":"6013777777",
    "icon":"call-outline"},

    {"titulo":"Movistar",
    "subtitulo":"3152333333",
    "icon":"call-outline"},

    {"titulo":"TIGO",
    "subtitulo":"018000422222",
    "icon":"call-outline"},

    {"titulo":"CLARO",
    "subtitulo":"6017441818",
    "icon":"call-outline"}
  ]

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
   this.get_comunicados();
  }

  upload_publication(){
    if ($("#nombre_numero").val() == "" || $("#numero").val() == "") {
      this.presentAlert("Debes rellenar todos los espacios")
    } else {
       var timei = new Date(Date.now());
   // var ti = moment(timei).format('h:mm:ss a'); 
   // var dt = moment(timei).format('DD-MM-YYYY'); 
    let numero = {
      nombre: this.nombre_numero,
      numero: this.numero
    };

    var id = Math.floor(Math.random() * 3213546846468435454) + 1
    console.log("random",id)
    var sid = id.toString()
    this.fbs.insertar("Proyectos/"+this.proyecto+"/encuestas/", sid, numero )
    //this.fbs.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/mascotas/", sid, numero )
    $("#nombre_numero").val("");
    $("#numero").val("");
    this.presentAlertdone();
    }
  }

  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Verifica el error',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  get_comunicados(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/encuestas").subscribe((servicios) => {
      this.numeros = [];
      servicios.forEach((datosTarea: any) => {
        this.numeros.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.numeros)
    });
}

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Listo!',
      subHeader: 'Registro exitoso',
      message: 'Encuesta guardada',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  llamar(number){
    console.log("Entre a la llamada de emergencia")
    //this.callNumber.callNumber(number, true)
  //  .then(res => console.log('Launched dialer!', res))
  //   .catch(err => console.log('Error launching dialer', err));
    }

  dismiss(){
    this.modalCtrl.dismiss();
  }

    async GoToURL(url){
     const browser = this.iab.create(url,'_self',{location:'no'});
  }

  async modal_info(url){
    const modal = await this.modalCtrl.create({
      component: OpenLinkPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        url: url,
        modaly: "encuestas"
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

  delete(comunicado){
    //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/encuestas", comunicado).then(() => {
    })
   }
}

