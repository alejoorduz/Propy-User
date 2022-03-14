import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.page.html',
  styleUrls: ['./beneficios.page.scss'],
})
export class BeneficiosPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Bono 15% descuento en ZARA",
    "subtitulo":"Valido hasta 15/03/2022",
    "icon":"image-outline",
    "fecha":"28/02/2022"},

    {"titulo":"MADRUGON OLIMPICA 20% DCTO adicional para afiliados compensar de 6 am a 11 am Valido 05/02/2022 Aplica Cundinamarca* Aplican TyC",
    "subtitulo":"Servicios de Veterinaria",
    "icon":"image-outline",
    "fecha":"15/01/2022"},
  ]

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
   // this.get_comunicados();
  }

//   get_comunicados(){
//     this.fbs.consultar("/Proyectos/"+this.proyecto+"/comunicados").subscribe((servicios) => {
//       this.comunicados = [];
//       servicios.forEach((datosTarea: any) => {
//         this.comunicados.push({
//           id: datosTarea.payload.doc.id,
//           data: datosTarea.payload.doc.data()
//         });
//       })
//       //this.password = this.lista_proyectos.data.key
//       console.log("traigamos la lista de comunicados")
//       console.log(this.comunicados)
//     });
// }

async modal_info(){
  const modal = await this.modalCtrl.create({
    component: InfoPage,
    cssClass: 'info_modal',
    componentProps: {
      uid: this.uid,
      nombre: this.nombre,
      proyecto: this.proyecto,
      url: "../../assets/images/qrcode.png"
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

  dismiss(){
    this.modalCtrl.dismiss();
  }



}


