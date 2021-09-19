import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { Student } from 'src/app/models/student';
import { Zaposlen } from 'src/app/models/zaposlen';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { ZaposlenService } from 'src/app/services/zaposlen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tip: string;
  korime: string;
  lozinka: string;

  errorMessage: string;

  constructor(public zaposlenServis: ZaposlenService,
              public studentServis: StudentService,
              public adminServis: AdminService,
              private router: Router)
              { }

  ngOnInit(): void {
    this.tip = 'Administrator';
    this.korime = '';
    this.lozinka = '';
    this.errorMessage = '';
  }

  onLogin(form: NgForm) {
    if(form.invalid) {
      return;
    }

    let error = false;
    this.errorMessage = '';

    if(this.tip == 'Zaposlen') {
      this.zaposlenServis.getZaposlen(this.korime).subscribe(
        response => {
          let zaposlen = response.zaposlen;
          if(zaposlen != null) {
            if(zaposlen.lozinka == this.lozinka) {
              //login
              sessionStorage.setItem('currentUser', JSON.stringify(this.korime));
              sessionStorage.setItem('currentTip', JSON.stringify('zaposlen'));
              sessionStorage.setItem('lozinkaChanged', JSON.stringify(zaposlen.lozinkaChanged));
              alert('Uspesno ste se ulogovali na sistem');
              if(zaposlen.lozinkaChanged == false) {
                this.router.navigate(['/lozinka']);
              }
              else {
                this.router.navigate(['/zaposlen']);
              }
            }
            else {
              error = true;
            }
          }
          else {
            error = true;
          }

          if(error) {
            this.errorMessage = 'Uneli ste nevalidne kredencijale za trazeni tip korisnika';
          }
        }, err => {
          console.log('Greska');
        });
    }

    if(this.tip == 'Student') {
      this.studentServis.getStudentByKorime(this.korime).subscribe(
        response => {
          let student = response.student;
          if(student != null) {
            if(student.lozinka == this.lozinka) {
              //login
              sessionStorage.setItem("currentUser", JSON.stringify(this.korime));
              sessionStorage.setItem('currentTip', JSON.stringify('student'));
              sessionStorage.setItem('lozinkaChanged', JSON.stringify(student.lozinkaChanged));
              alert('Uspesno ste se ulogovali na sistem');
              if(student.lozinkaChanged == false) {
                this.router.navigate(['/lozinka']);
              }
              else {
                this.router.navigate(['/student']);
              }
            }
            else {
              error = true;
            }
          }
          else {
            error = true;
          }
          if(error) {
            this.errorMessage = 'Uneli ste nevalidne kredencijale za trazeni tip korisnika';
          }
        }, err => {
          console.log('Greska');
        });
    }

    if(this.tip == 'Administrator') {
      this.adminServis.getAdmin(this.korime).subscribe(
        response => {
          let admin = response.admin;
          if(admin != null) {
            if(admin.lozinka == this.lozinka) {
              //login
              sessionStorage.setItem("currentUser", JSON.stringify(this.korime));
              sessionStorage.setItem('currentTip', JSON.stringify('admin'));
              sessionStorage.setItem('lozinkaChanged', JSON.stringify(admin.lozinkaChanged));
              alert('Uspesno ste se ulogovali na sistem');
              if(admin.lozinkaChanged == false) {
                this.router.navigate(['/lozinka']);
              }
              else {
                this.router.navigate(['/administrator']);
              }
            }
            else {
              error = true;
            }
          }
          else {
            error = true;
          }
          if(error) {
            this.errorMessage = 'Uneli ste nevalidne kredencijale za trazeni tip korisnika';
          }
        }, err => {
          console.log('Greska');
        });
    }
  }

  /*
  ubaciAdmina() {
    let admin = new Admin();
    admin.korime = this.korime;
    admin.lozinka = this.lozinka;
    this.adminServis.signupAdmin(admin);
  }
  */

}
