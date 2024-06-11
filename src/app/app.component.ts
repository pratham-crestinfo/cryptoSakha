import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { coinDataService } from './shared/coindata.service';
import { HttpClient, HttpHandler, } from '@angular/common/http';
import { AuthService } from './shared/auth.service';
import { DataBaseServie } from './shared/database.service';
import { DashBoardDataService } from './shared/dashboardata.service';
import { NavbarComponent } from './navbar/navbar.component';
import { User } from './shared/user.model';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[coinDataService,AuthService,DataBaseServie,DashBoardDataService,HttpClient,Router]
})
export class AppComponent {
  user:User=null;
  constructor(private auth:AuthService){}
  title = 'crypto_sakha';
  ngOnInit(){
    this.auth.autologin();
    
  }

 
}
