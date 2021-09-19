import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TIPOVI_STUDIJA } from 'src/app/data/studije';
import { NENASTAVNA_ZVANJA } from 'src/app/data/zvanja';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent implements OnInit {

  student: Student = new Student();
  tipovi_studija = TIPOVI_STUDIJA;

  indeksError: string;


  constructor(public servis: StudentService, private router: Router) { }

  ngOnInit(): void {
  }


  onSignup(form: NgForm) {
    //provera obrasca indeksa
    this.indeksError = '';
    if(this.servis.checkIndeks(this.student.indeks) == false) {
      this.indeksError = 'Indeks se mora uneti po sledecem obrascu: GGGG/BBBB';
      return;
    }

    //generisanje korisnickog imena na osnovu prikupljenih licnih podataka
    this.student.korime = this.servis.generateKorime(this.student);

    //ako je indeks za dat tip studija jedinstven -> registrovanje
    //inace: greska
    this.servis.getStudent(this.student.indeks, this.student.tipStudija).subscribe( res => {
      if(res.student == null) {
        alert('Uspesno registrovan student');
        this.servis.studentSignup(this.student);
        if(!this.isAdmin()) {
        this.router.navigate(['home']);
        }
        else {
          form.resetForm();
        }
      }
      else {
        this.indeksError = 'Indeks koji ste uneli mora biti jedinstven u sistemu';
      }
    });
  }

  isAdmin():boolean {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    return (currentUser == 'admin');
  }

}
