import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admin';
import { Student } from '../models/student';
import { Predmet } from '../models/predmet';
import { Zaposlen } from '../models/zaposlen';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { Grupa } from '../models/grupa';
import { Raspored } from '../models/raspored';
import { Obavestenje } from '../models/obavestenje';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private svaObavestenja = new Subject<Obavestenje[]>();

  constructor(private http: HttpClient,
              public datePipe: DatePipe) { }

  updateAdmin(admin: Admin) {
    return this.http.put<{ message: string }>(
      "http://localhost:3000/api/admin/updateAdmin/" + admin._id, admin);
   }

  adminLogin(admin: Admin) {
    return this.http.post("http://localhost:3000/api/admin/login", admin);
  }

  signupAdmin(admin: Admin) {
    this.http.post("http://localhost:3000/api/admin/signup", admin)
      .subscribe(response => {
        console.log(response);
      });
  }

  getStudent(korime: string) {
    return this.http.get<{ student: Student }>(
      "http://localhost:3000/api/admin/getStudent/" + korime
    );
  }

  getAllStudents() {
    return this.http.get<{ svi: Student[] }>(
      "http://localhost:3000/api/admin/getAllStudents"
    );
  }

  updateStudent(student: Student) {
     //indeks: GGGG/BBBB
    //ne saljem ceo indeks, jer '/' pravi problem pri rutiranju
    let god = student.indeks.substring(0,4);
    let br = student.indeks.substring(5, 9);

    let id = student._id;

    return this.http.put<{ message: string }>(
      "http://localhost:3000/api/admin/updateStudent/" + id, student
    );
  }

  isUnique(svi: Student[], student:Student) {
    //provera da li je indeks za dati tip studija jos uvek jedinstven
    let i = 0;
    let found = false;

    while(i < svi.length && !found) {
      if(svi[i].indeks == student.indeks && svi[i].tipStudija == student.tipStudija && svi[i]._id != student._id) {
        found = true;
      }
      else {
        i++;
      }
    }
    return found;
  }

  deleteStudent(korime: string) {
    this.http.delete("http://localhost:3000/api/admin/deleteStudent/" + korime)
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePredmet(sifra: string) {
    this.http.delete("http://localhost:3000/api/admin/deletePredmet/" + sifra)
      .subscribe(response => {
        console.log(response);
      });
  }

  getPredmet(sifra: string) {
    return this.http.get<{ predmet: Predmet }>(
      "http://localhost:3000/api/admin/getPredmet/" + sifra
    );
  }

  predmetSignup(predmet: Predmet) {
    this.http.post("http://localhost:3000/api/admin/insertPredmet", predmet)
      .subscribe(response => {
        console.log(response);
      });
  }

  splitNastavnici(nastavnici: string): string[] {
    let i = 0, j = 0, index = 0;
    let niz: string[] = [];

    while(i <= nastavnici.length) {
      if(nastavnici[i] == ',' || nastavnici[i] == ' ' || i == nastavnici.length) {
        if(nastavnici.substring(j, i) != '' && nastavnici.substring(j, i) != ' ') {
        niz[index] = nastavnici.substring(j, i);
        index++;
        }
        i++;
        while(nastavnici[i] == ' ') {
          i++;
        }
        j = i;
      }
      else {
        i++
      }
    }

    return niz;
  }

  getAllPredmets() {
    return this.http.get<{ svi: Predmet[] }>(
      "http://localhost:3000/api/admin/getAllPredmets"
    );
  }

  isUniquePredmet(svi: Predmet[], predmet: Predmet) {
    //provera da li je sifra jedinstvena
    let i = 0;
    let found = false;

    while(i < svi.length && !found) {
      if(svi[i].sifra == predmet.sifra && svi[i]._id != predmet._id) {
        found = true;
      }
      else {
        i++;
      }
    }
    return found;
  }

  updatePredmet(predmet: Predmet) {

   return this.http.put<{ message: string }>(
     "http://localhost:3000/api/admin/updatePredmet/" + predmet._id, predmet
   );
 }

 getZaposlen(korime: string) {
  return this.http.get<{ zaposlen: Zaposlen }>(
    "http://localhost:3000/api/admin/getZaposlen/" + korime
  );
 }

 deleteZaposlen(korime: string) {
  this.http.delete("http://localhost:3000/api/admin/deleteZaposlen/" + korime)
      .subscribe(response => {
        console.log(response);
      });
 }

 getAllZaposlens() {
  return this.http.get<{ svi: Zaposlen[] }>(
    "http://localhost:3000/api/admin/getAllZaposlens"
  );
}

isUniqueZaposlen(svi: Zaposlen[], zaposlen: Zaposlen) {
  //provera da li je korisnicko ime jedinstveno
  let i = 0;
  let found = false;

  while(i < svi.length && !found) {
    if(svi[i].korime == zaposlen.korime && svi[i]._id != zaposlen._id) {
      found = true;
    }
    else {
      i++;
    }
  }
  return found;
}

updateZaposlen(zaposlen: Zaposlen) {
 return this.http.put<{ message: string }>(
   "http://localhost:3000/api/admin/updateZaposlen/" + zaposlen._id, zaposlen
 );
}

checkGrupa(grupa: string): boolean {
  let isNum =/^\d+$/;

  if(grupa.length < 2) {
    return false;
  }

  if((grupa[0] == 'P' || grupa[0] == 'V') && isNum.test(grupa.substring(1, grupa.length))) {
    return true;
  }

  return false;
}

checkNastavnici(svi: string[], input: string[]): boolean {
  let i = 0;
  let ok = true;

  while(i < input.length && ok) {
   let index = svi.findIndex(s => s == input[i]);
   if(index == -1) {
    ok = false;
   }
   else {
     i++;
   }
  }

  return ok;

}

checkZaposleni(svi: Zaposlen[], input: string[]): boolean {
  let i = 0;
  let ok = true;

  while(i < input.length && ok) {
   let index = svi.findIndex(s => s.korime == input[i]);
   if(index > -1) {
    if(svi[index].tipZvanja == 'Nastavni') {
      i++;
    }
   }
   else {
     ok = false;
   }
  }

  return ok;

}

grupaSignup(grupa: Grupa) {
  this.http.post("http://localhost:3000/api/admin/insertGrupa", grupa)
    .subscribe(response => {
      console.log(response);
    });
}

getGrupa(ime: string, predmet: string) {
  return this.http.get<{ grupa: Grupa }>(
    "http://localhost:3000/api/admin/getGrupa/" + ime + '/' + predmet
  );
}

rasporedSignup(raspored: Raspored) {
  this.http.post("http://localhost:3000/api/admin/insertRaspored", raspored)
    .subscribe(response => {
      console.log(response);
    });
}

getAdmin(korime: string) {
  return this.http.get<{ admin: Admin }>(
    "http://localhost:3000/api/admin/getAdmin/" + korime
  );
}

checkSemestar(semestar: number): boolean {
  let ok = true;
  let ceo = /^\d+$/;

  ok = ceo.test(semestar.toString());

  if(semestar < 1 || semestar > 9) {
    ok = false;
  }

  return ok;
}


//------------------------- Obavestenja ----------------------------

insertObavestenje(obavestenje: Obavestenje) {
  return this.http.post("http://localhost:3000/api/admin/insertObavestenje", obavestenje);
}

deleteObavestenje(id: string) {
  return this.http.delete("http://localhost:3000/api/admin/deleteObavestenje/" + id);
 }

 getAllObavestenja(mode: number) {
  return this.http.get<{ sve: Obavestenje[] }>(
    "http://localhost:3000/api/admin/getAllObavestenja/" + mode
  );
}

convertDatum(datum: Date): string {
  return this.datePipe.transform(datum, 'dd.MM.yyyy.');
}

sortObavestenja(obavestenja: Obavestenje[]): Obavestenje[] {
  let i=0; let j = 0;
  for(i = 0; i < obavestenja.length; i++) {
    for(j = i + 1; j < obavestenja.length; j++) {
      if(obavestenja[i].datum < obavestenja[j].datum) {
        let temp = obavestenja[i];
        obavestenja[i] = obavestenja[j];
        let k = j;
        while(k > i + 1) {
          obavestenja[k] = obavestenja[k - 1];
          k--;
        }
        obavestenja[i + 1] = temp;
      }
    }
  }
  return obavestenja;
}

getNovaObavestenja(obavestenja: Obavestenje[]): Obavestenje[] {
  let i = 0;
  let today = new Date();
  let threeMonths = new Date();
  threeMonths.setMonth(today.getMonth() - 3);

  while(new Date(obavestenja[i].datum).getTime() >= threeMonths.getTime() && i < obavestenja.length) {
    i++;
  }

  return obavestenja.splice(0, i);
}


}
