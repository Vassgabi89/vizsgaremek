import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  signedIn = this.loginService.signedIn()
  //admin:boolean = (localStorage.getItem('admin') === 'true' ? true : false)

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('admin')) localStorage.setItem('admin', 'false')
  }

}
