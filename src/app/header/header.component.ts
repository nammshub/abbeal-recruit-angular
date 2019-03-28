import { Component, OnInit } from '@angular/core';
import { LoginService } from '../user/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService:LoginService) { }

  ngOnInit() {
  }
}
