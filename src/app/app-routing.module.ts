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
  },
  {
    path: 'documentos',
    loadChildren: () => import('./documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./mascotas/mascotas.module').then( m => m.MascotasPageModule)
  },
  {
    path: 'trasteos',
    loadChildren: () => import('./trasteos/trasteos.module').then( m => m.TrasteosPageModule)
  },
  {
    path: 'clasificados',
    loadChildren: () => import('./clasificados/clasificados.module').then( m => m.ClasificadosPageModule)
  },
  {
    path: 'directorio',
    loadChildren: () => import('./directorio/directorio.module').then( m => m.DirectorioPageModule)
  },
  {
    path: 'finanzas',
    loadChildren: () => import('./finanzas/finanzas.module').then( m => m.FinanzasPageModule)
  },
  {
    path: 'autorizaciones',
    loadChildren: () => import('./autorizaciones/autorizaciones.module').then( m => m.AutorizacionesPageModule)
  },
  {
    path: 'beneficios',
    loadChildren: () => import('./beneficios/beneficios.module').then( m => m.BeneficiosPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'acceso',
    loadChildren: () => import('./acceso/acceso.module').then( m => m.AccesoPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'citofonia',
    loadChildren: () => import('./citofonia/citofonia.module').then( m => m.CitofoniaPageModule)
  },
  {
    path: 'encuestas',
    loadChildren: () => import('./encuestas/encuestas.module').then( m => m.EncuestasPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'open-link',
    loadChildren: () => import('./open-link/open-link.module').then( m => m.OpenLinkPageModule)
  },
  {
    path: 'votaciones',
    loadChildren: () => import('./voting/votaciones/votaciones.module').then( m => m.VotacionesPageModule)
  },
  {
    path: 'vote-info',
    loadChildren: () => import('./voting/vote-info/vote-info.module').then( m => m.VoteInfoPageModule)
  },
  {
    path: 'vehiculos',
    loadChildren: () => import('./personal/rides/vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'modal-rides',
    loadChildren: () => import('./personal/rides/modal-rides/modal-rides.module').then( m => m.ModalRidesPageModule)
  },
  {
    path: 'parking',
    loadChildren: () => import('./park/parking/parking.module').then( m => m.ParkingPageModule)
  },
  {
    path: 'ofrecer-spot',
    loadChildren: () => import('./park/ofrecer-spot/ofrecer-spot.module').then( m => m.OfrecerSpotPageModule)
  },
  {
    path: 'buscar-spot',
    loadChildren: () => import('./park/buscar-spot/buscar-spot.module').then( m => m.BuscarSpotPageModule)
  },  {
    path: 'timedate-picker',
    loadChildren: () => import('./popups/timedate-picker/timedate-picker.module').then( m => m.TimedatePickerPageModule)
  },
  {
    path: 'mis-spots',
    loadChildren: () => import('./park/mis-spots/mis-spots.module').then( m => m.MisSpotsPageModule)
  },
  {
    path: 'lista-spots',
    loadChildren: () => import('./park/lista-spots/lista-spots.module').then( m => m.ListaSpotsPageModule)
  },
  {
    path: 'modal-spot',
    loadChildren: () => import('./park/modal-spot/modal-spot.module').then( m => m.ModalSpotPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
