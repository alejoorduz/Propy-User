import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    console.log(this.uid,this.nombre,this.email,this.rol)
  }

  dismiss(){
    console.log("cerrando modal de perfil")
    this.modalCtrl.dismiss();
    //this.router.navigate(["/proyectos"])
  }

  perfil(){
    console.log("aca deberia ir la carga de imagen de perfil")
  }
}