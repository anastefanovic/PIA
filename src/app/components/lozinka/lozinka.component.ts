import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';
import { ZaposlenService } from 'src/app/services/zaposlen.service';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit {

  user: string;
  tip: string;

  //lozinka
  stara: string;
  nova: string;

  error: string;

  constructor(private admin: AdminService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));
    this.tip = JSON.parse(sessionStorage.getItem("currentTip"));
    console.log(this.user);
    console.log(this.tip);
  }

  onClick(form: NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.tip == "zaposlen") {
      this.admin.getZaposlen(this.user).subscribe(
        response => {
          let temp = response.zaposlen;
          if(temp.lozinka != this.stara) {
            this.error = "Uneli ste neispravnu lozinku";
            return;
          }
          if(this.stara == this.nova) {
            this.error = "Nova lozinka ne sme biti ista kao trenutna";
            return;
          }
          temp.lozinka = this.nova;
          temp.lozinkaChanged = true;
          this.admin.updateZaposlen(temp).subscribe(
            response => {
              alert('Uspešno ste promenili lozinku');
              sessionStorage.removeItem("currentUser");
              sessionStorage.removeItem("currentTip");
              this.router.navigate(['/home']);
            });
        });
    }

    if(this.tip == "admin") {
      this.admin.getAdmin(this.user).subscribe(
        response => {
          let temp = response.admin;
          if(temp.lozinka != this.stara) {
            this.error = "Uneli ste neispravnu lozinku";
            return;
          }
          if(this.stara == this.nova) {
            this.error = "Nova lozinka ne sme biti ista kao trenutna";
            return;
          }
          temp.lozinka = this.nova;
          temp.lozinkaChanged = true;
          this.admin.updateAdmin(temp).subscribe(
            response => {
              alert('Uspešno ste promenili lozinku');
              sessionStorage.removeItem("currentUser");
              sessionStorage.removeItem("currentTip");
              this.router.navigate(['/home']);
            });
        });
    }

    if(this.tip == "student") {
      this.admin.getStudent(this.user).subscribe(
        response => {
          let temp = response.student;
          if(temp.lozinka != this.stara) {
            this.error = "Uneli ste neispravnu lozinku";
            return;
          }
          if(this.stara == this.nova) {
            this.error = "Nova lozinka ne sme biti ista kao trenutna";
            return;
          }
          temp.lozinka = this.nova;
          temp.lozinkaChanged = true;
          this.admin.updateStudent(temp).subscribe(
            response => {
              alert('Uspešno ste promenili lozinku');
              sessionStorage.removeItem("currentUser");
              sessionStorage.removeItem("currentTip");
              this.router.navigate(['/home']);
            });
        });
    }

  }

}
