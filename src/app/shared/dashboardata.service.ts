import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { coinDataService } from "./coindata.service";

@Injectable()
export class DashBoardDataService
{
     constructor(private http:HttpClient,private coindataservice:coinDataService){}
     globalmarket_params= {referenceCurrencyUuid: 'yhjMzLPhuIDl'}
     headers=new HttpHeaders({
          'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }) 
       
     getglobalstats()
     {
         return this.http.get("https://coinranking1.p.rapidapi.com/stats",{headers:this.headers,params:this.globalmarket_params})
     }
     offset:number=0;
     coindata_params={
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          timePeriod: '24h',
          'tiers[0]': '1',
          orderBy: 'marketCap',
          orderDirection: 'desc',
          limit: '50',
          offset: '0'
        }
     getCoinsData(offs:string)
     {
          console.log("getting coins data")
          this.coindata_params.offset=offs;
          return this.http.get('https://coinranking1.p.rapidapi.com/coins',{headers:this.headers,params:this.coindata_params})
     }
}
