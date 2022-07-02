import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import * as $ from "jquery";
import { ToastController,AlertController,ModalController } from '@ionic/angular';
import * as moment from "moment";
import { ListaSpotsPage } from "../lista-spots/lista-spots.page";


@Component({
  selector: 'app-buscar-spot',
  templateUrl: './buscar-spot.page.html',
  styleUrls: ['./buscar-spot.page.scss'],
})
export class BuscarSpotPage implements OnInit {


  statusMessage: string;
  devices:any[] = [];

  constructor(private toastCtrl: ToastController,private ngZone: NgZone,private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre
 
uuid = "";

  tarjeteros = [];

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("Proyectos/"+this.proyecto+"/parking/").subscribe((servicios) => {
      this.tarjeteros = [];
      servicios.forEach((datosTarea: any) => {
        this.tarjeteros.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.tarjeteros)
    });
}

delete(comunicado,fecha){
  const res = confirm("¿Estás seguro que quieres eliminar este SPOT?");
  if(res){
      this.fbs.delete_doc("Proyectos/"+this.proyecto+"/parking/"+fecha+"/spots/", comunicado).then(() => {
      })
      this.fbs.delete_doc("user/"+this.uid+"/proyectos/"+this.proyecto+"/spots/", comunicado).then(() => {
      })
  }
}

  async alert(header,subHeader,message) {
    const alert = await this.alertController.create({
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

  dismiss(){
    this.modalCtrl.dismiss();
  }

  async lista_spots(fecha){
    const modal = await this.modalCtrl.create({
      component: ListaSpotsPage,
      cssClass: 'adding_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
        torre: this.torre,
        apto: this.apto,
        fecha: fecha
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

