import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user.model';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataBaseServie } from '../shared/database.service';
import { LotteryTextComponent } from './lottery-text/lottery-text.component';
import { AuthComponent } from '../auth/auth.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
declare var VANTA: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LotteryTextComponent, AuthComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor( 
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private http: HttpClient,
    private dbs: DataBaseServie
  ) {}

  isAuthenticated: boolean = false;
  user: User=null;
  test_var: boolean = false;
  canAdd: boolean = false;
  coinid_array: string[] = [];
  usercoinpromise: any;
  usercoinid: string[] = [];
  currentSection: number = 1;
  wantToAuth: boolean = false;
  vantaEffect: any;
  goToAuth() {
    this.router.navigate(['/auth'], { relativeTo: this.activeRoute });
  }

  ngOnInit() {
    // this.authservice.autologin();
    console.log("helllllllo")
    // this.authservice.isAuthenticated.subscribe({
    //   next: (res) => {
    //     this.isAuthenticated = res;
    //     if (
    //       this.user &&
    //       this.isAuthenticated == true &&
    //       new Date() < this.user._tokenExpirationDate
    //     ) {
    //       // this.canAdd = true;
    //     }
    //     console.log('hii');
    //   },
    // });
    this.authservice.user.subscribe({
      next: (res) => {
        this.user = res;
        if (
          this.user &&
          new Date() < new Date(this.user._tokenExpirationDate)
        ) {
          this.canAdd = true;
          this.dbs.makeIdArray(this.user.id);
          console.log('hello');
        }
      },
    });
    // console.log(this.user);
    // console.log(this.isAuthenticated);
    if( this.user==null || new Date() > new Date(this.user._tokenExpirationDate))
      {
       this.canAdd=false;
      }
  }

  addcoinid(myform: NgForm) {
    if (this.canAdd == true) {
      console.log('Adding');
      this.dbs.addCoinId(this.user.id, myform.form.value.coinid);
    }
  }
  getid() {
    this.dbs.getcoind(this.user.id);
  }
  goWatchList() {
    this.router.navigate(['/watchlist'], { relativeTo: this.activeRoute });
  }







  @ViewChild('vantaContainer', { static: true }) vantaContainer: ElementRef;
 


  ngAfterViewInit() {
    const fixedText = document.getElementById('fixed-text');
    const sections = document.querySelectorAll('.parallax');
    const fixEle = document.getElementsByClassName('fixed-element');
    const options = {
      threshold: 0.5, // Adjust this value as needed
    };





    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionNumber = Array.from(sections).indexOf(entry.target) + 1;
          if (fixedText) {
            fixedText.textContent = `0${sectionNumber}`;
            fixedText.style.marginTop = `${(sectionNumber + 1) * 25}%`;
            this.currentSection = sectionNumber;
          }
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    this.vantaEffect = VANTA.NET({
      el: this.vantaContainer.nativeElement,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xc5b8b8,
      backgroundColor: 0x0,
      points: 14.00
    })

















  }
  wantToAuthpressed() {
    this.wantToAuth = true;
  }
}
// console.log(this.user);
// console.log(this.isAuthenticated);
// console.log(this.user._tokenExpirationDate);

// this.http
// .post(`https://crypto-sakha-default-rtdb.firebaseio.com/${this.user.id}.json`,this.coinid_array)
// .subscribe({
//   next: (res) => {console.log(res);},
//   error: (error: Error) => {console.log(error);},
//   complete:()=>[
//     this.http.get(`https://crypto-sakha-default-rtdb.firebaseio.com/${this.user.id}.json`).subscribe({
//   next:(res)=>{
//     console.log(res)
//   }
// })
//   ]
// });
