import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  loginAdmin(korime: string, lozinka: string): boolean {
    return false;
  }


  loginStudent(korime: string, lozinka: string): boolean {
    return false;
  }
}
