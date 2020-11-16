import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appTitle = 'MaxKart';

  appDescription = 'Max Gold Shop';

  constructor() {
  }

  ngOnInit(): void {
    // this.sessionUser = {
    //   name: 'eialarasu',
    //   roleId: 'admin',
    //   avatarUrl: 'assets/images/avatar_2x.png'
    // };
  }

}
