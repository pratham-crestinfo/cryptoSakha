import { Component } from '@angular/core';
import { DashBoardDataService } from '../shared/dashboardata.service';
import { HttpClient } from '@angular/common/http';
import { coinDataService } from '../shared/coindata.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { generate, of } from 'rxjs';
import { SparklineComponent } from './sparkline/sparkline.component';
import { MatIconModule } from '@angular/material/icon';
import { RotatingGlobeComponent } from '../rotating-globe/rotating-globe.component';
import { FlipTextComponent } from './flip-text/flip-text.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { LoadingComponent } from '../loading/loading.component';
interface coinDataType{
  name:string,
  iconUrl:string,
  change:string,
  symbol:string, 
  price:string,
  uuid:string,
  sparkLineData:number[];
  color:string;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SparklineComponent,MatIconModule,RotatingGlobeComponent,LoadingComponent,FlipTextComponent,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent 
{
  constructor(private http:HttpClient,private coindataservice:coinDataService,private dashboardservice:DashBoardDataService,private activeroute:ActivatedRoute,private router:Router,private authservice:AuthService){}
  referenceCurrencyRate:number=0;
  totalCoins:number=0;
  totalMarkets:number=0;
  totalExchanges:number=0;
  totalMarketCap:string="";
  total24hVolume:string="";
  btcDominance:string="";
  bestcoins:any[]=[];
  newestCoins:any[]=[];
  stats:Array<{ [key: string]: any }>=[];
  coinData:coinDataType[]=[];
  offset:number=0;
  prevpossible:boolean=false;
  datafetched:boolean=false;
  skd:number[]=[];
  gstats:string[]=[];
  user:User=null;
  isAuthenticated:boolean=false;
  loading:number=0;
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
   if( this.user==null )
    {
      this.router.navigate(['/oops'],{relativeTo:this.activeroute});
    }else{
      console.log(this.user);
    }
















    this.dashboardservice.getglobalstats().subscribe({
      next:(res:any)=>{
        // this.stats.push({referenceCurrencyRate: res.data.referenceCurrencyRate})
           this.gstats.push("Reference Currency Rate: " + res.data.referenceCurrencyRate + " USD")

          //  this.stats.push({totalCoins: res.data.totalCoins})
           this.gstats.push("Total Coins: " + res.data.totalCoins)

          //  this.stats.push({totalMarkets: res.data.totalMarkets})
           this.gstats.push("Total Markets: " + res.data.totalMarkets)

          //  this.stats.push({totalExchanges: res.data.totalExchanges})
           this.gstats.push("Total Exchanges: " +  res.data.totalExchanges)

          //  this.stats.push({totalMarketCap: this.coindataservice.getValues(res.data.totalMarketCap)})
           this.gstats.push("Total MarketCap: " +  this.coindataservice.getValues(res.data.totalMarketCap))

          //  this.stats.push({total24hVolume: this.coindataservice.getValues(res.data.totalMarketCap)})
           this.gstats.push(" Total 24hVolume:" +  this.coindataservice.getValues(res.data.totalMarketCap))

          //  this.stats.push({btcDominance: this.coindataservice.getValues(res.data.btcDominance)})
           this.gstats.push("btcDominance: " + this.coindataservice.getValues(res.data.btcDominance))

           this.bestcoins=res.data.bestCoins;
           this.newestCoins=res.data.newestCoins;
      },
      error:(error:Error)=>{
        console.log(error);
      },
    complete:()=>{
      this.loading++;
    }})
      this.dashboardservice.getCoinsData('0').subscribe({
        next:(res:any)=>{
          for(let i=0;i<res.data.coins.length;i++)
            {
                 this.coinData.push({
                  name:res.data.coins[i].name,
                  iconUrl:res.data.coins[i].iconUrl,
                  change:this.getchange(res.data.coins[i].change),
                  symbol:res.data.coins[i].symbol, 
                  price:res.data.coins[i].price,
                  uuid:res.data.coins[i].uuid,
                  sparkLineData:res.data.coins[i].sparkline,
                  color:res.data.coins[i].color
                 })
            }
            // const temp_arr=[];
            // for(let i=0;i<res.data.coins[40].sparkline.length;i++)
            //   {
            //     temp_arr.push(Number(res.data.coins[40].sparkline[i]))
            //   }
            // this.skd=temp_arr;
        },
        error:(err:Error)=>{
          console.log(err);
        },
        complete:()=>{
          this.datafetched=true;
          this.loading++;
        }
      })
  }
  getObjectKey(obj: { [key: string]: any }): string {
    return Object.keys(obj)[0];
  }

  // Method to get the value of the object
  getObjectValue(obj: { [key: string]: any }): any {
    const key = this.getObjectKey(obj);
    return obj[key];
  }
  getCoinDetails(id:string)
  {
    this.router.navigate(['/coin',id],{relativeTo:this.activeroute})
  }
  forward(){
    this.offset=this.offset+50;
    this.loading--;
    this.prevpossible=true;
      this.dashboardservice.getCoinsData(String(this.offset)).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.coinData=[];
          for(let i=0;i<res.data.coins.length;i++)
            {
                 this.coinData.push({
                  name:res.data.coins[i].name,
                  iconUrl:res.data.coins[i].iconUrl,
                  change:res.data.coins[i].change,
                  symbol:res.data.coins[i].symbol, 
                  price:res.data.coins[i].price,
                  uuid:res.data.coins[i].uuid,
                  sparkLineData:res.data.coins[i].sparkline,
                  color:res.data.coins[i].color
                 })
            }
        } ,
        error:(err:Error)=>{
          console.log(err);
        },
        complete:()=>{
          this.loading++;
        }
      })
  }
  prev(){
    this.offset=this.offset-50;
    if(this.offset<=0)
      {
        this.offset=0;
        this.prevpossible=false;
      }
    this.dashboardservice.getCoinsData(String(this.offset)).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.coinData=[];
        for(let i=0;i<res.data.coins.length;i++)
          {
               this.coinData.push({
                name:res.data.coins[i].name,
                iconUrl:res.data.coins[i].iconUrl,
                change:res.data.coins[i].change,
                symbol:res.data.coins[i].symbol, 
                price:res.data.coins[i].price,
                uuid:res.data.coins[i].uuid,
                sparkLineData:res.data.coins[i].sparkline,
                color:res.data.coins[i].color
               })
          }
      } ,
      error:(err:Error)=>{
        console.log(err);
      }
    })
  }
  getchange(change:number)
  {
      if(change>0)
        return "+" + change;
      else
        return String(change);
  }
  getColor(change:any){
    // console.log(change);
    return Number(change)>0 ? "green" : "red";
  }
  circleTransform = 'translate3d(-100px, -100px, 0)'; // Initial off-screen position
  onMouseMove(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.circleTransform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }
}
