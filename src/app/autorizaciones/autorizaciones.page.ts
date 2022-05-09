import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController,ModalController } from '@ionic/angular';
import { InfoPage } from "../info/info.page";
import * as moment from "moment";

@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.page.html',
  styleUrls: ['./autorizaciones.page.scss'],
})
export class AutorizacionesPage implements OnInit {

  constructor(private fbs: FirestoreService,private firestoreService: FirestoreService,private modalCtrl: ModalController , public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto
  @Input() torre

  reporte: string
 
  comunicados = [];

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("/user/"+this.uid+"/proyectos/"+this.proyecto+"/autorizaciones").subscribe((servicios) => {
      this.comunicados = [];
      servicios.forEach((datosTarea: any) => {
        this.comunicados.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      //this.password = this.lista_proyectos.data.key
      console.log("traigamos la lista de comunicados")
      console.log(this.comunicados)
    });
}

async presentAlertBlock(header,text) {
  const alert = await this.alertController.create({
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

  upload_publication(){
    if (!this.apto) {
      this.presentAlertBlock("Usuario sin apartamento ","Ve a tu perfil y rellena tu apartamento para poder hacer reservas")
     } else {
    if ($("#apto").val() == "" || $("#reporte").val() == "") {
      this.presentAlert("Debes rellenar todos los espacios")
    } else {
      const res = confirm("Estas seguro que quieres agregar esta autorización?");
      if(res){
          var timei = new Date(Date.now());
          var ti = moment(timei).format('h:mm:ss a'); 
          var dt = moment(timei).format('DD-MM-YYYY'); 
          let comunicado = {
              nombre: this.nombre,
              torre: this.torre,
              apto: this.apto,
              reporte: this.reporte,
              dia: dt,
              hora: ti
          };
        var id = Math.floor(Math.random() * 3213546846468435454) + 1
        console.log("random",id)
        var sid = id.toString()
        this.firestoreService.insertar("Proyectos/"+this.proyecto+"/autorizaciones/", sid, comunicado )
        this.firestoreService.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/autorizaciones/", sid, comunicado )
        $("#apto").val("")
        $("#nombres").val("")
        $("#especie").val("")
        $("#reporte").val("")
        this.presentAlertdone();
      }
       
    }
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

  async presentAlertdone() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Listo!',
      subHeader: 'Autorización guardada correctamente',
      message: 'Gracias.',
      buttons: ['OK']
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  delete(comunicado){
    //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
    this.fbs.delete_doc("Proyectos/"+this.proyecto+"/autorizaciones", comunicado).then(() => {
    })

    this.fbs.delete_doc("/user/"+this.uid+"/proyectos/"+this.proyecto+"/autorizaciones", comunicado).then(() => {
    })
  
    // this.fbs.delete_doc("Admins/"+this.current_user_uid+"/proyectos",proyecto).then(() => {
    //   // Actualizar la lista completa
    //   this.consultar_lista_servicios();
    //   // Limpiar datos de pantalla
    //   //this.tareaEditando = {} as Tarea;
    // })
    
  }
}


