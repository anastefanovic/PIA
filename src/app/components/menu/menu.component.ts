import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  rti() {
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
    if(user == null) {
      this.router.navigate(['/home']);
    }
  }

  menu() {
    let tip = JSON.parse(sessionStorage.getItem("currentTip"));
    if(tip == "admin") {
      this.router.navigate(['/administrator']);
    }
    if(tip == "student") {
      this.router.navigate(['/student']);
    }
    if(tip == "zaposlen") {
      this.router.navigate(['/zaposlen']);
    }
  }

}
