import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { coinDataService } from '../shared/coindata.service';
import { ChartComponent } from './chart/chart.component';
import { CommonModule } from '@angular/common';
import { Chart2Component } from './chart2/chart2.component';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { DataBaseServie } from '../shared/database.service';
import { LoadingComponent } from '../loading/loading.component';

interface dataArrayType{
  field:string;
  value:string | number;
}
interface linkType{
  name:string
url:string
type:string
}




@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [ChartComponent,CommonModule,Chart2Component,MatIconModule,LoadingComponent],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css',
})
export class CoinComponent implements AfterViewInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private coinDataService: coinDataService,
    private elementRef: ElementRef,
    private authservice:AuthService,
    private router:Router,
    private dbs:DataBaseServie
  ) {}
  @ViewChild('cardContainer') cardContainer: ElementRef;
  isDataLoaded = false;
  id: string = '';
  volume_24h:string="";
  alltimehigh_price:string="";
  alltimehigh_time:string="";
  marketCap:string="";
  maxSupply:string="";
  circulatingSupply:string="";
  supplytime:string="";
  change:string="";
  price:string="";
  priceTime:string="";
  iconUrl:string="";
  color:string="";
  name:string="";
  symbol:string="";
  chart_types:string[]=["prices","ohlc"];
  inner_color:string="";
  data:dataArrayType[]=[];
  numberOfMarkets:number=0;
  description:string="";
  link:linkType[]=[];
  user:User=null;
  isAuthenticated:boolean=false;
  coinIdarr:string[]=[];
  canAdd:boolean=true;
  loading:boolean=true;
  fullpageloaded:boolean=false;
  ngOnInit() 
  {
    
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

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
   if( this.user==null|| new Date() > new Date(this.user._tokenExpirationDate))
    {
      this.router.navigate(['/oops'],{relativeTo:this.activeRoute});
      console.log("false user")
    }
    else{
      this.dbs.CoinIdArray.subscribe({
        next:(res)=>{
          console.log("subscription")
          this.coinIdarr=res;
          console.log(this.coinIdarr.includes(this.id))
          if(this.coinIdarr.includes(this.id)){
            console.log(this.coinIdarr);
            this.canAdd=false;
          }
          else{
            console.log(this.id)
            this.canAdd=true;
          }
        }
      })
    }
  
  














    this.coinDataService.getCoinData(this.id).subscribe({
      next: (mydata:any) => {
        console.log(mydata)
          this.assigndata(mydata);      
      },
      complete:()=>{
        this.isDataLoaded = true;
        this.fullpageloaded=true;
        this.elementRef.nativeElement.style.setProperty('--default-inner-color', this.inner_color);       
      }
    });
  }


  assigndata(mydata:any)
  {
    this.volume_24h="$ " + mydata.data.coin['24hVolume'];
    this.alltimehigh_price=this.coinDataService.getValues(Number(parseFloat(mydata.data.coin.allTimeHigh.price).toFixed(2)));
    this.alltimehigh_time=this.coinDataService.getDateTime(mydata.data.coin.allTimeHigh.timestamp);
    this.marketCap=this.coinDataService.getValues(Number(mydata.data.coin.marketCap));
    this.maxSupply=this.coinDataService.getValues(Number(mydata.data.coin.supply.max));
    this.circulatingSupply=this.coinDataService.getValues(Number(mydata.data.coin.supply.circulating));
    this.supplytime=this.coinDataService.getDateTime(mydata.data.coin.supply.supplyAt);
    this.change= this.getchange(mydata.data.coin.change) 
    this.price=this.formatNumber(+this.coinDataService.getValues(Number(parseFloat(mydata.data.coin.price).toFixed(2))));
    this.priceTime=this.coinDataService.getDateTime(mydata.data.coin.allTimeHigh.timestamp);
    this.iconUrl=mydata.data.coin.iconUrl;
    this.inner_color=this.color=mydata.data.coin.color;
    this.name=mydata.data.coin.name;
    this.symbol=mydata.data.coin.symbol;
    this.numberOfMarkets=mydata.data.coin.numberOfMarkets;
    this.description=mydata.data.coin.description;
    this.link=mydata.data.coin.links

    this.data.push({field:"24H volume",value:this.volume_24h});
    this.data.push({field:"Total Markets",value:this.numberOfMarkets});
    this.data.push({field:"All-Time High Price",value:"$" + this.alltimehigh_price});
    this.data.push({field:"All-Time High Time",value:this.alltimehigh_time});
    this.data.push({field:"Market Cap",value:this.marketCap});
    this.data.push({field:"Max. Supply",value:this.maxSupply});
    this.data.push({field:"Circulating Supply",value:this.circulatingSupply});
    this.data.push({field:"Supply Time was at",value:this.supplytime});
    
  }
  formatNumber(value: number): string {
    return value.toFixed(2);  // Ensures the number always has two decimal places
  }
  getColor(){
    return Number(this.change)>0 ? "green" : "red"
  }
  getchange(num:number){
    if(num>0)
      return "+" + num ;
    else
    return  String(num) ;
  }










  ngAfterViewInit() {
    const container = this.cardContainer.nativeElement;
  
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
  
    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
  
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });
  
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });
  
    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 3; // Scroll-fast
      container.scrollLeft = scrollLeft - walk;
    });
  }
  
  addId()
  {
    this.dbs.addCoinId(this.user.id,this.id);
  }



}

