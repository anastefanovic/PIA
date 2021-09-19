import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zaposlen } from 'src/app/models/zaposlen';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  zaposlen: Zaposlen;
  korime: string;

  constructor(private route: ActivatedRoute,
              private servis: AdminService) { }

  ngOnInit(): void {
    this.zaposlen = new Zaposlen();
    this.korime = this.route.snapshot.paramMap.get('korime');
    this.servis.getZaposlen(this.korime).subscribe(
      response => {
        this.zaposlen = response.zaposlen;
      });
  }

}
