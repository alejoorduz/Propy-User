import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'iniciosesion',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'iniciosesion',
    loadChildren: () => import('./iniciosesion/iniciosesion.module').then( m => m.IniciosesionPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'comunicados',
    loadChildren: () => import('./comunicados/comunicados.module').then( m => m.ComunicadosPageModule)
  },
  {
    path: 'pagoadmin',
    loadChildren: () => import('./pagoadmin/pagoadmin.module').then( m => m.PagoadminPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reserva/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'verificacion',
    loadChildren: () => import('./verificacion/verificacion.module').then( m => m.VerificacionPageModule)
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('./inscripciones/inscripciones/inscripciones.module').then( m => m.InscripcionesPageModule)
  },
  {
    path: 'inscribirse-modal',
    loadChildren: () => import('./inscripciones/inscribirse-modal/inscribirse-modal.module').then( m => m.InscribirseModalPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'monitoreo',
    loadChildren: () => import('./monitoreo/monitoreo.module').then( m => m.MonitoreoPageModule)
  },
  {
    path: 'botonera',
    loadChildren: () => import('./aircall/botonera/botonera.module').then( m => m.BotoneraPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./aircall/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'emergencias',
    loadChildren: () => import('./emergencias/emergencias.module').then( m => m.EmergenciasPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'mis-reservas',
    loadChildren: () => import('./reserva/mis-reservas/mis-reservas.module').then( m => m.MisReservasPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
