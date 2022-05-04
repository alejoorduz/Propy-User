import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import * as $ from "jquery";
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from "moment";

@Component({
  selector: 'app-trasteos',
  templateUrl: './trasteos.page.html',
  styleUrls: ['./trasteos.page.scss'],
})
export class TrasteosPage implements OnInit {


  constructor(private fbs: FirestoreService,private firestoreService: FirestoreService,private modalCtrl: ModalController , public alertController: AlertController) { }
  @Input() uid
  @Input() nombre
  @Input() proyecto
  @Input() apto

  
  fecha: string
  myDate: Date;

  comunicados = [];

  ngOnInit() {
    console.log("aja: ", this.uid,this.nombre,this.proyecto)
    this.get_comunicados();
  }

  get_comunicados(){
    this.fbs.consultar("/user/"+this.uid+"/proyectos/"+this.proyecto+"/mudanzas").subscribe((servicios) => {
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
     

       console.log(this.myDate)
      var ti = moment(this.myDate).format('h:mm:ss a'); 
      var dt = moment(this.myDate).format('DD-MM-YYYY');
      const res = confirm("¿Confirmar trasteo para el dia "+dt+" a las " + ti + "?");
      if(res){
            let mudanza = {
            nombre: this.nombre,
            apto: this.apto,
            fecha: dt,
            hora: ti
                // dia: dt,
                // hora: ti
              };
              var id = Math.floor(Math.random() * 3213546846468435454) + 1
              console.log("random",id)
              var sid = id.toString()
            //this.firestoreService.add("Proyectos/"+this.proyecto+"/mudanzas", mudanza );
            this.firestoreService.insertar("Proyectos/"+this.proyecto+"/mudanzas/", sid, mudanza )
            this.firestoreService.insertar("user/"+this.uid+"/proyectos/"+this.proyecto+"/mudanzas/", sid, mudanza )
          // $("#apto").val("")
            this.presentAlertdone();
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
      subHeader: 'Tu mudanza quedo agendada',
      message: 'Gracias!',
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
    const res = confirm("Estas seguro que quieres eliminar este trasteo?");
    if(res){
      //console.log("borrando base de datos de",this.current_user_uid,  " del proyecto ",proyecto)
      this.fbs.delete_doc("Proyectos/"+this.proyecto+"/mudanzas", comunicado).then(() => {
        // Actualizar la lista completa
      // this.consultar_lista_servicios();
        // Limpiar datos de pantalla
        //this.tareaEditando = {} as Tarea;
      })

      this.fbs.delete_doc("user/"+this.uid+"/proyectos/"+this.proyecto+"/mudanzas", comunicado).then(() => {
        // Actualizar la lista completa
      // this.consultar_lista_servicios();
        // Limpiar datos de pantalla
        //this.tareaEditando = {} as Tarea;
      })
    
      // this.fbs.delete_doc("Admins/"+this.current_user_uid+"/proyectos",proyecto).then(() => {
      //   // Actualizar la lista completa
      //   this.consultar_lista_servicios();
      //   // Limpiar datos de pantalla
      //   //this.tareaEditando = {} as Tarea;
      // })
    }
    
    
  }
}


