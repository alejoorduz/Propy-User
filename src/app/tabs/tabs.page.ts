import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  format(id){
    // console.log(id)
    if (id === "perfil") {
      console.log("perfil");
      $('#apto').css('color','black')
      $('#inicio').css('color','black')
      $('#perfil').css('color','red')
    }
    if (id === "inicio") {
      console.log("inicio");
      $('#apto').css('color','black')
      $('#perfil').css('color','black')
      $('#inicio').css('color','red')
    }
    if (id === "apto") {
      console.log("apto");
      $('#perfil').css('color','black')
      $('#inicio').css('color','black')
      $('#apto').css('color','red')
    }
  }

}
