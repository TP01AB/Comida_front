import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminInicioComponent } from './pages/admin/admin-inicio/admin-inicio.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'iniciar', component: LoginComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'verificarEmail', component: VerifyEmailComponent },
  { path: 'admin/inicio', component: AdminInicioComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
