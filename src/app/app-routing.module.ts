import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { HomeComponent } from './components/home/home.component';
import { LozinkaComponent } from './components/lozinka/lozinka.component';
import { ObavestenjaComponent } from './components/obavestenja/obavestenja.component';
import { PredmetComponent } from './components/predmet/predmet.component';
import { PredmetiListaComponent } from './components/predmeti-lista/predmeti-lista.component';
import { ProfilComponent } from './components/profil/profil.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { StudentComponent } from './components/student/student.component';
import { ZaposlenSignupComponent } from './components/zaposlen-signup/zaposlen-signup.component';
import { ZaposlenComponent } from './components/zaposlen/zaposlen.component';
import { ZaposleniListaComponent } from './components/zaposleni-lista/zaposleni-lista.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'zaposlen-signup', component: ZaposlenSignupComponent },
  { path: 'student-signup', component: StudentSignupComponent },
  { path: 'zaposleni-lista', component: ZaposleniListaComponent },
  { path: 'predmet', component: PredmetComponent },
  { path: 'predmet/:sifra/:tip/:korime', component: PredmetComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'obavestenja/:mode', component: ObavestenjaComponent },
  { path: 'predmeti-lista/:smer', component: PredmetiListaComponent },
  { path: 'zaposlen', component: ZaposlenComponent },
  { path: 'lozinka', component: LozinkaComponent },
  { path: 'profil/:korime', component: ProfilComponent },
  { path: 'student', component: StudentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
