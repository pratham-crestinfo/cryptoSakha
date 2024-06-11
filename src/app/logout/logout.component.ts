import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveDataPoint } from 'chart.js';
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authservice:AuthService,private router:Router,private activeroute:ActivatedRoute){}
  makelogout(){
    this.authservice.user.next(null);
    this.authservice.isAuthenticated.next(false);
    localStorage.removeItem("userData");
    this.router.navigate(['/home'],{relativeTo:this.activeroute});

  }
}
