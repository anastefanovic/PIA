import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Obavestenje } from 'src/app/models/obavestenje';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  modes: string[] = ['Pozivi za studentska takmičenja',
                     'Konferencije',
                     'Ponude za praksu',
                     'Ponude za posao'];

  isAdmin: boolean;
  mode: number;
  newObavestenje: Obavestenje;
  deleteObavestenje: Obavestenje;
  datum: string;
  obavestenja: Obavestenje [];

  constructor(private route: ActivatedRoute,
              private servis: AdminService) {}

  ngOnInit(): void {
    this.newObavestenje = new Obavestenje();
    this.deleteObavestenje = new Obavestenje();
    this.obavestenja = [];

    this.route.params.subscribe(param => {
      this.loadPage(param.mode);
    });

  }

  loadPage(mode: string) {
    this.mode = parseInt(mode);
    this.newObavestenje = new Obavestenje();
    this.deleteObavestenje = new Obavestenje();
    this.datum = null;
    this.getObavestenja();
    this.getCurrentUser();

  }

  onObavestenjeInsert(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.newObavestenje.tip = this.mode;
    this.newObavestenje.datum = new Date();

    this.servis.insertObavestenje(this.newObavestenje).subscribe(
      response => {
        console.log(response);
        this.getObavestenja();
      });

    alert('Uspešno ste uneli novo obaveštenje');

  }

  insertDatum() {
    this.newObavestenje.datum = new Date(this.datum);
  }

  getObavestenja() {
    this.servis.getAllObavestenja(this.mode).subscribe(
      response => {
        let temp = this.servis.sortObavestenja(response.sve);
        this.obavestenja = this.servis.getNovaObavestenja(temp);
      });
  }

  convertDatum(datum: Date): string {
    return this.servis.convertDatum(datum);
  }

  getCurrentUser() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.isAdmin = (currentUser == 'admin');
    console.log("Trenutni korisnik: " + currentUser);
  }

  onDelete(obavestenje: Obavestenje) {
    this.servis.deleteObavestenje(obavestenje._id).subscribe(
      response => {
        this.getObavestenja();
      });
  }

  /*
  test() {
    let danas = new Date();
    console.log('Danas: ' + this.convertDatum(danas));
    danas.setMonth(danas.getMonth() - 3);
    console.log('3 meseca ranije: ' + this.convertDatum(danas));
  }
  */


}
