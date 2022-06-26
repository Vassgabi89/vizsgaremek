import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  newUser: boolean = false
  user!: User

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if (param['id'] === '0') {
        this.user = new User()
        this.newUser = true
        return
      }
      this.userService.get(param['id']).forEach(user => {
        this.user = user
      })
    })
  }

  onSubmit(user: User): void {
    if (!this.newUser) {
      const data = this.userService.update(user).subscribe(
        //datas => console.log(datas)
        datas => this.router.navigateByUrl('users')
      )
    }
    else {
      const data = this.userService.create(user).subscribe(
        //datas => console.log(datas)
        datas => this.router.navigateByUrl('users')
        )
      }
      //this.router.navigateByUrl('users')
  }
}
