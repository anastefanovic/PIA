import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Raspored } from '../models/raspored';
import { Predmet } from '../models/predmet';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  checkIndeks(indeks: string):boolean {
    let indeksRegex = /^\d{4}\/\d{4}$/;
    return indeksRegex.test(indeks);
  }

  generateKorime(student: Student): string {
    //mejl: piGGBBBBx@student.etf.rs
    //indeks: GGGG/BBBB
    let korime = '';
    korime = korime + student.prezime.substring(0, 1).toLocaleLowerCase();
    korime = korime + student.ime.substring(0, 1).toLocaleLowerCase();
    korime = korime + student.indeks.substring(2, 4);
    korime = korime + student.indeks.substring(5);
    if(student.tipStudija ==  "Osnovne akademske studije") {
      korime = korime + 'd';
    }
    if(student.tipStudija ==  "Master akademske studije") {
      korime = korime + 'm';
    }
    if(student.tipStudija ==  "Doktorske studije") {
      korime = korime + 'p';
    }
    korime = korime + '@student.etf.bg.ac.rs';

    return korime;
  }

  getStudent(indeks: string, tipStudija: string) {
    //indeks: GGGG/BBBB
    //ne saljem ceo indeks, jer '/' pravi problem pri rutiranju
    let god = indeks.substring(0,4);
    let br = indeks.substring(5, 9);
    return this.http.get<{ student: Student }>(
      "http://localhost:3000/api/student/getStudent/" + god + "/" + br + "/" + tipStudija
    );
  }

  getStudentByKorime(korime: string) {
    return this.http.get<{ student: Student }>(
      "http://localhost:3000/api/student/getStudentByKorime/" + korime
    );
  }

  studentSignup(student: Student) {
    this.http.post("http://localhost:3000/api/student/signup", student)
    .subscribe(response => {
      console.log(response);
    });
  }

  studentLogin(student: Student) {
    return this.http.post("http://localhost:3000/api/student/login", student);
  }

  getMojRaspored(korime: string) {
    return this.http.get<{ raspored: Raspored[] }>(
      "http://localhost:3000/api/student/getRaspored/" + korime
    );
  }

  getPredmeti() {
    return this.http.get<{ predmeti: Predmet[] }>(
      "http://localhost:3000/api/student/getPredmeti"
    );
  }



}
