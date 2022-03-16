import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})
export class DirectorioPage implements OnInit {

  constructor(private fbs: FirestoreService,private callNumber: CallNumber,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
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

  get_comunicados(){
    this.fbs.consultar("/Proyectos/"+this.proyecto+"/directorio").subscribe((servicios) => {
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
      header: 'Listo!',
      subHeader: 'Formulario enviado con exito',
      message: 'Gracias por tus sugerencias.',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  llamar(number){
    console.log("Entre a la llamada de emergencia")
    this.callNumber.callNumber(number, true)
   .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

  dismiss(){
    this.modalCtrl.dismiss();
  }



}

