import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './core/guards/auth.guard';
import { Role } from './core/models/role';


export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule),
        canActivate: [AuthGuard],
        data: { title: 'Button', titleI18n: 'button', data: { roles: [Role.Operador, Role.Servicios] } }
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];


