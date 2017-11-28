import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SeetingsComponent } from './seetings/seetings.component';
import { GuardService } from '../app/_services/guard.service';
import { RegisterComponent } from './register/register.component';

const appRoutes : Routes = [
    {path: 'register', component: RegisterComponent, data: {name: '_register'} },
    {path : 'login', component: LoginComponent },
    {path : '', component : HomeComponent, canActivate : [GuardService] },
    {path :  'seetings', component : SeetingsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(appRoutes);