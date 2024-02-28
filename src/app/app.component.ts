import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userActivation: boolean = false;

  id: number = 0;

  constructor(
    private UserService: UserService,
    private ARoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.UserService.activatedUserEmitter.subscribe((didActivate) => {
      this.userActivation = didActivate;
    });
    
    this.UserService.userId.subscribe((value: number) => {
      this.id = value;
    });
  }
}
