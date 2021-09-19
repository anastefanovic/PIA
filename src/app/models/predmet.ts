export class Predmet {
  _id: string;
  ime: string;
  sifra: string;
  tip: string;
  espb: string;
  cilj: string;
  predavanja: string;
  vezbe: string;
  nastavnici: string[];
  propozicije: string;
  semestar: number;
  smer: string;
};

export class  Predmet_obavestenje {
  _id: string;
  predmet: string;
  obavestenje: string;
  datum: Date;
}
