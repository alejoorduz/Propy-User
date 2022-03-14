import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";

@Component({
  selector: 'app-clasificados',
  templateUrl: './clasificados.page.html',
  styleUrls: ['./clasificados.page.scss'],
})
export class ClasificadosPage implements OnInit {

  constructor(private fbs: FirestoreService,private modalCtrl: ModalController ,public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
 
  comunicados  = [
    {"titulo":"Dr. Arturo Orduz",
    "subtitulo":"Consultas de Veterinaria",
    "icon":"image-outline",
    "url":"../../assets/images/vet.png",
    "fecha":"28/02/2022"},

    {"titulo":"Pets World",
    "subtitulo":"Servicios de Veterinaria",
    "icon":"image-outline",
    "url":"../../assets/images/vet.png",
    "fecha":"15/01/2022"},

    {"titulo":"Wash Lavanderia",
    "subtitulo":"Recogemos y llevamos tu ropa lista a domicilio",
    "icon":"image-outline",
    "url":"../../assets/images/lavanderia.png",
    "fecha":"31/11/2021"},

    {"titulo":"FarmaciTodo",
    "subtitulo":"Envio gratuito para usuarios Propy",
    "icon":"image-outline",
    "url":"../../assets/images/farmacia.png",
    "fecha":"12/10/2021"},

    {"titulo":"Panaderia 153",
    "subtitulo":"Domicilios 24/7 ",
    "icon":"image-outline",
    "url":"../../assets/images/panaderia.png",
    "fecha":"18/08/2021"},

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

  async modal_info(url){
    const modal = await this.modalCtrl.create({
      component: InfoPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        proyecto: this.proyecto,
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



}
