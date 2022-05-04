import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as $ from "jquery";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { LoadingController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { InfoPage } from "../info/info.page";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  @Input() uid;
  @Input() nombre;
  @Input() email;
  @Input() rol;
  @Input() apto;
  @Input() image_url;

  account_config_ok;
  profile_image_yes;

  user_info: any = {
    id: "",
    data: {}
};

current_user_uid;
current_user_name;
current_user_email;
current_user_rol;
current_user_activate;
current_user_apto;
current_user_image;

  constructor(
    private loadingController: LoadingController,
    private db: AngularFirestore,
    private storage: AngularFireStorage, 
    private fbs: FirestoreService,
    private modalCtrl: ModalController,
    private router: Router) { }

UserInfo: Observable<any[]>;
UserInfoRef: AngularFirestoreCollection;
selectedFile: any;
loading: HTMLIonLoadingElement;

ngOnInit() {
    console.log("uid user info and image url",this.uid,this.nombre,this.email,this.image_url)
    //this.apto = "2121"
    this.bring_user_info()
  }

bring_user_info(){
  this.fbs.consultarPorId("user/", this.uid).subscribe((resultado) => {
    if (resultado.payload.data() != null) {
        this.user_info.id = resultado.payload.id;
        this.user_info.data = resultado.payload.data();
    }
    this.current_user_name = this.user_info.data.displayName;
    this.current_user_email = this.user_info.data.email;
    this.current_user_rol = this.user_info.data.rol;
    this.current_user_activate = this.user_info.data.habilitado;
    this.current_user_apto = this.user_info.data.apto;
    this.current_user_image = this.user_info.data.image_url;
    //console.log("el usuario esta activado? :",this.current_user_activate)
    //let edificio = this.user_info.data.proyecto
   // this.consultar_proyectos()
    console.log("Apartamento, img url ",this.current_user_apto, this.current_user_image)
    if(!this.current_user_apto){
      console.log("cuenta no configured")
      //this.account_config_ok = true;
      $('#config').css("border","solid 1px red")
      $('#config_dos').css("border","solid 1px red")
    }
    if(this.current_user_image){
      console.log("Si hay imagen de perfil")
      this.profile_image_yes = "true"
    }
    if(this.current_user_image == "undefined"){
      console.log("NOO hay imagen de perfil")
      this.profile_image_yes = "false"
    }
});
}

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  delete_image(){
    const res = confirm("¿Estas seguro que quieres eliminar la foto de perfil?");
    if(res){
     this.storage.ref(`users/profile_pic/${this.uid}`).delete()
     this.fbs.update("user/",this.uid,{"image_url": ""})
     this.dismiss();
    }
    
  }
  
 async addUserInfo(){
    await this.presentLoading();
    this.fbs.update("user/",this.uid,{"apto": this.apto})
    this.fbs.update("user/",this.uid,{"nombre": this.nombre})
    // this.UserInfoRef.add({
    //  // nombre: this.nombre,
    //   apto: this.apto,
    // })
    // .then(async resp => {
      if (this.selectedFile) {
        console.log("si hay archivo elegido de imagen de perfil")
         const imageUrl = await this.uploadFile(this.uid, this.selectedFile)
         this.fbs.update("user/",this.uid,{"image_url": imageUrl})
      }else{
        console.log("NOO hay archivo elegido de imagen de perfil")
      }
      this.loading.dismiss();
      this.dismiss()
     
     // thi
      // this.UserInfoRef.doc(resp.id).update({
      //   id: resp.id,
      //   imageUrl: imageUrl || null
      // })
     // this.addTodo();
    // }).catch(error => {
    //   console.log(error);
    // })
  }
  
  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        const task = await this.storage.ref('users/profile_pic').child(id).put(file[0])
        $('#name').val("");
        return this.storage.ref(`users/profile_pic/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Porfavor espere...'
    });
    return this.loading.present();
  }

  del_apto(){
    $('#apto').val('')
  }

  del_name(){
    $('#nombre').val('')
  }
  
  dismiss(){
    console.log("cerrando modal de perfil")
    this.modalCtrl.dismiss(true);
    //this.router.navigate(["/proyectos"])
  }

  perfil(){
    console.log("aca deberia ir la carga de imagen de perfil")
  }

  async modal_info(url){
    const modal = await this.modalCtrl.create({
      component: InfoPage,
      cssClass: 'info_modal',
      componentProps: {
        uid: this.uid,
        nombre: this.nombre,
        //proyecto: this.proyecto,
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