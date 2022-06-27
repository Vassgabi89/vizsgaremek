import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/service/train.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  signedIn = this.loginService.signedIn()
  trainList$ = this.trainService.getAll()
  carouselPictures! : string[]

  constructor(
    private loginService: LoginService,
    private trainService: TrainService
  ) { }

  ngOnInit(): void {
  }

}
