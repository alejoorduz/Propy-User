import { Component, OnInit, Input } from '@angular/core';
//import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FirestoreService } from '../firestore.service';
//import { $ } from 'protractor';
import * as $ from "jquery";
import { identifierModuleUrl } from '@angular/compiler';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pagoadmin',
  templateUrl: './pagoadmin.page.html',
  styleUrls: ['./pagoadmin.page.scss'],
})
export class PagoadminPage implements OnInit {

  @Input() uid
  @Input() nombre
  @Input() proyecto

  link: any = {
    id: "",
    data: {}
};

  link_pago: string;
  link_db:string;
//,private iab: InAppBrowser
  constructor(private firestoreService: FirestoreService,private modalCtrl: ModalController) { }
  
  
  ngOnInit() {
    this.consultar_link()
   // this.iab.create("https://solucionesverticales.com.co/",'blank')
    //var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
  }


  consultar_link(){
    console.log("consultado link en base de datos")
    this.firestoreService.consultarPorId("Proyectos/"+this.proyecto+"/Pago", "Link").subscribe((resultado) => {
      if (resultado.payload.data() != null) {
          this.link.id = resultado.payload.id;
          this.link.data = resultado.payload.data();
      }
      this.link_db = this.link.data.Link;
      $("#link").attr("src",this.link_db);
      // let email = this.user_info.data.email;
      // let saldo = this.user_info.data.saldo;
      console.log("usuario: ",this.link_db)
  });
  }
  
  dismiss(){
    this.modalCtrl.dismiss();
  }

}
