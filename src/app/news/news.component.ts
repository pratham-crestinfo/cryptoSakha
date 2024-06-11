import { Component } from '@angular/core';
import { NewscardComponent } from './newscard/newscard.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NewscardComponent,CommonModule,NavbarComponent,LoadingComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
constructor(private http:HttpClient,private authservice:AuthService,private activeroute:ActivatedRoute,private router:Router){}
private newsHeaders= new HttpHeaders({
  'X-RapidAPI-Key': "048d15adfcmshf4bf0eb6ec402b3p1f6a49jsn8358e679b251",
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
})
newsData:any[]=[];
user:User=null;
isAuthenticated:boolean=false;
loaded:boolean=false;
ngOnInit()
{
  this.authservice.isAuthenticated.subscribe({
    next: (res) => {
      console.log(res);
      this.isAuthenticated = res;
    },
  });
  this.authservice.user.subscribe({
    next: (res) => {
      console.log(res);
      this.user = res;
    },
  });
 if( this.user==null || new Date() > new Date(this.user._tokenExpirationDate))
  {
    this.router.navigate(['/oops'],{relativeTo:this.activeroute})
  }
else
{
  this.http.get("https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk",{headers:this.newsHeaders}).subscribe({
    next:(res:any)=>{
      console.log(res.data);
      this.newsData=res.data;
    },
    error:(err)=>{
      console.log(err);
    },
    complete:()=>{
      this.loaded=true;
    }
  })
}













// https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk

  
}
}
