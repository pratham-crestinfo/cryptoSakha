import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseServie } from '../shared/database.service';
import { coinDataService } from '../shared/coindata.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SparklineComponent } from '../dashboard/sparkline/sparkline.component';
import { SearchComponent } from '../search/search.component';
interface coinDataType {
  name: string;
  iconUrl: string;
  change: string;
  symbol: string;
  price: string;
  uuid: string;
  marketCap:string;
  vol_24:string;
}

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent,SparklineComponent,SearchComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dbs: DataBaseServie,
    private coindataservice: coinDataService
  ) {}
  isAuthenticated: boolean = false;
  user: User;
  coinId: string[] = [];
  coinData:coinDataType[]=[];
  // coinData: coinDataType[] = [{name:"Bitcoin",iconUrl:"https://cdn.coinranking.com/Sy33Krudb/btc.svg",change:"1.2",symbol:"BTC",price:"4567",uuid:"Qwsogvtv82FCd"},{name:"Etheriusajh",iconUrl:"https://cdn.coinranking.com/Sy33Krudb/btc.svg",change:"1.2",symbol:"BTC",price:"027851",uuid:"Qwsogvtv82FCd"},{name:"h6tjuwrjkBitcoin",iconUrl:"https://cdn.coinranking.com/Sy33Krudb/btc.svg",change:"1567",symbol:"BTC",price:"45aeradsdlkjtbhaihf67",uuid:"Qwsogvtv82FCd"}];
  nodata: boolean = false;
  ngOnInit() {
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
    this.dbs.CoinIdArray.subscribe({
      next:(res)=>{
        console.log("coinIdres:" + res)
        this.coinId=res;
        // console.log("coinidarr:" ,this.coinId)
        // this.ngOnInit();
        this.assign();
      }
    })
    // this.assign();
  }
  fetchCoinData(uid: string): Promise<any> {
    return this.dbs.getcoind(uid);
  }
  getCoinDetails(id: string) {
    this.router.navigate(['/coin', id], { relativeTo: this.activeRoute });
  }
  getColor(num:string)
  {
    return Number(num)>0 ? "green" : "red";
  }
  assign(){
    this.nodata=false;
    if (this.user == null || new Date() > new Date(this.user._tokenExpirationDate)) {
      this.router.navigate(['/oops'], { relativeTo: this.activeRoute });
    } else {
      console.log("kaisa hei bhai");
      if (this.coinId == undefined || this.coinId.length == 0) 
        {
        console.log('NO DATA FOUND');
        this.nodata = true;
      } 
      else {
        this.coinData=[];
        console.log("kya bhai");
        for (let i = 0; i < this.coinId.length; i++) {
          this.coindataservice.getCoinData(this.coinId[i]).subscribe({
            next: (res: any) => {
              this.coinData.push({
                name: res.data.coin.name,
                iconUrl: res.data.coin.iconUrl,
                change: res.data.coin.change,
                symbol: res.data.coin.symbol,
                price: res.data.coin.price,
                uuid: res.data.coin.uuid,
                marketCap:res.data.coin.marketCap,
                vol_24:res.data.coin.btcPrice,
              });
            },
          });
        }
      }
    }
  }
}
