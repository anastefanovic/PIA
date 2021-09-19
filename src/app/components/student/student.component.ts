import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupa } from 'src/app/models/grupa';
import { Predmet } from 'src/app/models/predmet';
import { Raspored } from 'src/app/models/raspored';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  expand: string;
  korime: string;
  student: Student;
  raspored: Raspored [];
  predmeti: Predmet [];

  constructor(private router: Router,
              private servis: StudentService) { }

  ngOnInit(): void {
    this.expand = "";
    this.student = new Student();
    this.raspored = [];
    this.predmeti = [];


    this.getCurrentUser();
  }

  getCurrentUser() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    this.korime = currentUser;
    this.getStudent();
    console.log("Trenutni korisnik: " + currentUser);
  }

  onLogout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentTip");
    sessionStorage.removeItem("lozinkaChanged");
    this.router.navigate(['/home']);
  }

  getStudent() {
    this.servis.getStudentByKorime(this.korime).subscribe(
      response => {
        this.student = response.student;
      });
  }

  onClick(mode: string) {
    this.expand = mode;
    if(mode == 'predmeti') {
      this.mojRaspored();
    }
  }

  mojRaspored() {
    this.servis.getMojRaspored(this.korime).subscribe(
      response => {
        this.raspored = response.raspored;
        this.mojiPredmeti();
      });
  }

  mojiPredmeti() {
    this.servis.getPredmeti().subscribe(
      response => {
        this.predmeti = [];
        let temp = response.predmeti;
        for(let i =0; i < this.raspored.length; i++) {
          let index = temp.findIndex(t => t.sifra == this.raspored[i].predmet);
          if(index > -1) {
            this.predmeti.push(temp[index]);
          }
        }
        this.predmeti = this. sortPredmeti(this.predmeti);
      });
  }

  sortPredmeti(predmeti: Predmet[]): Predmet[] {
    let i=0; let j = 0;
    for(i = 0; i < predmeti.length; i++) {
      for(j = i + 1; j < predmeti.length; j++) {
        if(predmeti[i].semestar > predmeti[j].semestar) {
          let temp = predmeti[i];
          predmeti[i] = predmeti[j];
          let k = j;
          while(k > i + 1) {
            predmeti[k] = predmeti[k - 1];
            k--;
          }
          predmeti[i + 1] = temp;
        }
      }
    }
    return predmeti;
  }

}
