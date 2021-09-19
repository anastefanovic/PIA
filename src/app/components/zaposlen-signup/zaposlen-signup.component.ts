import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NENASTAVNA_ZVANJA, NASTAVNA_ZVANJA } from 'src/app/data/zvanja';
import { Zaposlen } from 'src/app/models/zaposlen';
import { ZaposlenService } from 'src/app/services/zaposlen.service';
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-zaposlen-signup',
  templateUrl: './zaposlen-signup.component.html',
  styleUrls: ['./zaposlen-signup.component.css']
})
export class ZaposlenSignupComponent implements OnInit {

  nenastavna_zvanja = NENASTAVNA_ZVANJA;
  nastavna_zvanja = NASTAVNA_ZVANJA;

  zaposlen: Zaposlen = new Zaposlen();

  //error messages
  korimeError: string;
  mobilniError: string;
  error: boolean;

  image;
  imagePreview: string;


  constructor(public servis: ZaposlenService, private router: Router) { }

  ngOnInit(): void {
    this.zaposlen.tipZvanja = "Nastavni";
    this.zaposlen.bio = "";
    this.zaposlen.vebsajt = "";
    this.zaposlen.mobilni = "";
    this.korimeError = '';
    this.mobilniError = '';
    this.error = false;

    this.image = null;
  }

  onSignup(form: NgForm) {
    this.mobilniError = '';
    this.korimeError = '';
    this.error = false;

    if(form.invalid) {
      return;
    }

    //provera da li korisnicko ime ima razmak u sebi
    if(this.servis.checkKorime(this.zaposlen.korime) == false) {
      this.korimeError = 'Korisnicko ime mora biti jedna rec';
      this.error = true;
    }
    //provera da li broj sadrzi samo cifre
    if(this.servis.checkMobilni(this.zaposlen.mobilni) == false) {
      this.mobilniError = 'Broj telefona moze sadrzati samo cifre';
      this.error = true;
    }
    //provera da li postoji neka greska u podacima pre kreiranja korisnika
    if(this.error == true) {
      return;
    }

    this.servis.getZaposlen(this.zaposlen.korime).subscribe( res => {
      if(res.zaposlen == null) {
        alert('Uspesno registrovan zaposlen');
        if(this.image == null) {
          this.zaposlen.slikaPath = null;
          this.servis.signupZaposlen(this.zaposlen);
        }
        else {
          this.servis.signupZaposlenWithImg(this.zaposlen, this.image);
        }
        //ako je trenutno ulogovan admin, u tom slucaju treba ostati na strani, jer admin dodaje novog zaposlenog
        if(!this.isAdmin()) {
        this.router.navigate(['home']);
        }
        else {
          form.resetForm();
        }
      }
      else {
        this.korimeError = 'Korisnicko ime koje ste uneli mora biti jedinstveno u sistemu';
      }
    });
  }

  isAdmin():boolean {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (currentUser == 'admin');
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.image = file;
    console.log(this.image);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };

    reader.readAsDataURL(file);

  }

}
