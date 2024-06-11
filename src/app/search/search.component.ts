import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private http: HttpClient,private router:Router,private activeroute:ActivatedRoute) {}
  search_headers = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  });

  suggestions:any[]=[];
  getsuggestion(query:any) {
    console.log(query.value);
    this.http.get('https://coinranking1.p.rapidapi.com/search-suggestions',{headers:this.search_headers,params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      query: `${query.value}`
    }})
    .subscribe({
      next:(res:any)=>{
        console.log(res.data.coins);
        this.suggestions=[];
        for(let i=0;i<res.data.coins.length;i++)
        {
            this.suggestions.push({name:res.data.coins[i].name ,uuid:res.data.coins[i].uuid })
            console.log(res.data.coins[i].name)
        }
      },
      error:(error:Error)=>{
        console.log(error);
      }
    });
  }
  coinsdetails(id:string){
    this.router.navigate(['/coin',id],{relativeTo:this.activeroute})
  }
}
