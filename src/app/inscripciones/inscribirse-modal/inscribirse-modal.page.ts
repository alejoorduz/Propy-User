import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import * as $ from "jquery";
import { data } from 'jquery';
import { ModalController } from "@ionic/angular";
import { FirestoreService } from '../../firestore.service';
//import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-inscribirse-modal',
  templateUrl: './inscribirse-modal.page.html',
  styleUrls: ['./inscribirse-modal.page.scss'],
})
export class InscribirseModalPage implements OnInit {


  @Input() uid
  @Input() nombre
  //-----------------datos del formulario--------------------------
  //servicio del edificio
  proyecto: string  //= "Piscina"
  //variables del picker de dias de la semana en los que el servicio esta habilitado
  lunes: boolean
  martes: boolean
  miercoles: boolean
  jueves: boolean
  viernes: boolean
  sabado: boolean
  domingo: boolean

  //servicios disponibles por la app
  reservas: boolean
  pagos: boolean
  comunicados: boolean
  documentos: boolean

  //contraseña del proyecto a agregar
  password: string;

  //bandera que indica si el proyecto fue activado
  activated: boolean;
 
  //Variables del picker de horas admitidas por reserva, hora inicial y final
  hora_inicial: number
  hora_final: number
  horas_reserva: number

  dias_habiles = [];
  lista_proyectos  = [];

  lista_config: any = {
    id: "",
    data: {}
};
//,public alertController: AlertController,public formModule: FormsModule
  constructor(private alertCtrl: AlertController,private fbs: FirestoreService ,public navCtrl: NavController,private storage: Storage,private modalCtrl: ModalController,private firestoreService: FirestoreService) { }

  
  ngOnInit(): void {
     //this.storage.create();
  }
  
  ionViewWillEnter() {
    this.consultar_lista_proyectos()
  }

  consultar_lista_proyectos(){
    this.fbs.consultar("/Proyectos").subscribe((servicios) => {
      this.lista_proyectos = [];
      servicios.forEach((datosTarea: any) => {
        this.lista_proyectos.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de edificios")
      console.log(this.lista_proyectos)
    });
  }

  bring_passcode(){
    console.log("traigo la contraseña")
    console.log(this.proyecto)
    this.fbs.consultarPorId("Proyectos/", this.proyecto).subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.lista_config.id = resultado.payload.id;
          this.lista_config.data = resultado.payload.data();
      }
      this.password = this.lista_config.data.key;
      console.log("usuario: ", this.lista_config.data.key)
  });
  }

 //funcion que guarda los dias de la semana habilitados en un array
  submitForm() {
    var passcode = $("#key").val();
    if (passcode == "") {
      console.log("vacioo")
      this.presentAlert("Constraseña vacia","Debes escribir la contraseña")
    }else{
    if (passcode == this.password) {
      console.log("Contraseña correcta")
      this.upload_project_to_user()
      //this.return_flag();
    }else{
      this.presentAlert("Constraseña incorrecta","Asegurate de escribir bien la contraseña de ingreso")
      console.log("contraseña incorrecta")
    }
    }
  }

  async presentAlert(header,text) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      subHeader: header,
      message: text,
      buttons: ['OK']
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

  upload_project_to_user(){
    this.firestoreService.insertardos("user",this.uid,"proyectos", this.proyecto, {"config": "configs"} )
    this.firestoreService.insertardos("Proyectos", this.proyecto, "usuarios", this.nombre, {"id": this.uid} )
    //this.firestoreService.updatedos("Proyectos",this.proyecto,"usuarios", this.nombre,  {"email": this.email} )
    this.modalCtrl.dismiss();
    // .then(() => {
    //   console.log('Datos subidos correctamente!');
    //   //this.tareaEditando= {} as Tarea;
    // }, (error) => {
    //   console.error(error);
    // });
  }
  
  conarg(){
    this.modalCtrl.dismiss({
    /*  id: this.id,
      uuid: this.uuid,
      marca: this.marca,
      color: this.color,
      viajes: this.viajes,
      tiempo: this.tiempo,
      producido: this.tiempo*/
    })
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }


}
