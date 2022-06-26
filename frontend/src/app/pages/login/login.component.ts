import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData:any = {email: '', password: ''}

  constructor(
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.logout()
  }

  login(): void {
    this.loginService.login(this.loginData)
  }

}
