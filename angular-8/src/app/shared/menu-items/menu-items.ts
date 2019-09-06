import { Injectable } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { Role } from '../../core/models/role';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMSOper = [
  { state: 'starter', name: 'Inicio', type: 'link', icon: 'av_timer' },
  { state: 'operador', type: 'link', name: 'Servicios', icon: 'local_taxi' }
];

const MENUITEMSServicios = [
  { state: 'starter', name: 'Inicio', type: 'link', icon: 'av_timer' },
  { state: 'operador', type: 'link', name: 'Operador', icon: 'local_taxi' },
  { state: 'reportes', type: 'link', name: 'Reportes', icon: 'view_list' }
];

const MENUITEMSAdmin = [
  { state: 'starter', name: 'Inicio', type: 'link', icon: 'av_timer' },
  { state: 'operador', type: 'link', name: 'Operador', icon: 'local_taxi' },
  { state: 'reportes', type: 'link', name: 'Reportes', icon: 'view_list' },
  { state: 'snackbar', type: 'link', name: 'Administración', icon: 'adb' }
];

/*
const MENUITEMS = [
  { state: 'starter', name: 'Starter Page', type: 'link', icon: 'av_timer' },
  { state: 'tabs', type: 'link', name: 'Servicios', icon: 'local_taxi' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];
*/
@Injectable()
export class MenuItems {

  constructor(private loginService: LoginService) {

  }
  getMenuitem(): Menu[] {
    /*Verificamos si dentro de los roles del usuario existen el rol permitido*/
    if (this.loginService.currentUserValue.roles.indexOf(Role.Administrador) > -1)
      return MENUITEMSAdmin;
    else if (this.loginService.currentUserValue.roles.indexOf(Role.Servicios) > -1)
      return MENUITEMSServicios;
    else
      return MENUITEMSOper;

  }
}
