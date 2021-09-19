import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ZaposlenSignupComponent } from './components/zaposlen-signup/zaposlen-signup.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { HomeComponent } from './components/home/home.component';
import { ZaposleniListaComponent } from './components/zaposleni-lista/zaposleni-lista.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { PredmetComponent } from './components/predmet/predmet.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ObavestenjaComponent } from './components/obavestenja/obavestenja.component';
import { PredmetiListaComponent } from './components/predmeti-lista/predmeti-lista.component';
import { ZaposlenComponent } from './components/zaposlen/zaposlen.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LozinkaComponent } from './components/lozinka/lozinka.component';
import { ProfilComponent } from './components/profil/profil.component';
import { StudentComponent } from './components/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZaposlenSignupComponent,
    StudentSignupComponent,
    HomeComponent,
    ZaposleniListaComponent,
    MenuComponent,
    PredmetComponent,
    AdministratorComponent,
    ObavestenjaComponent,
    PredmetiListaComponent,
    ZaposlenComponent,
    LozinkaComponent,
    ProfilComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
