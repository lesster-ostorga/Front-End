import { Routes } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { MenuComponent } from './menu/menu.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { LoginComponent } from './sessions/login/login.component';
import { Error404Component } from './sessions/error404/error404.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { Role } from '../core/models/role';
import { OperadorComponent } from './operador/operador.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ProfileComponent } from './profile/profile.component';

export const MaterialRoutes: Routes = [
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Button', titleI18n: 'button', data: { roles: [Role.Servicios, Role.Administrador] } }
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'operador',
    component: OperadorComponent,
    canActivate: [AuthGuard],
    data: { title: 'Button', titleI18n: 'button', data: { roles: [Role.Operador, Role.Servicios, Role.Administrador] } }
  },
  {
    path: 'profile',
    component: ProfileComponent
  
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent,
    canActivate: [AuthGuard],
    data: { title: 'Button', titleI18n: 'button', data: { roles: [Role.Administrador] } }
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '404',
    component: Error404Component,
  }
];


