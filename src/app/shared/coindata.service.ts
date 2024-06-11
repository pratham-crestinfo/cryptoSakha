import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class coinDataService {
  constructor(private http: HttpClient) {}

  // GET COIN
  coinDataHeader = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  });
  coinDataParams = { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' };
  getCoinData(id: string) {
    return this.http.get(`https://coinranking1.p.rapidapi.com/coin/${id}`, {
      headers: this.coinDataHeader,
      params: this.coinDataParams,
    });
  }

  // GET DATE TIME IN STRING FORMAT
  getDateTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  // GET DATE
  getDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${day}-${month}-${year-2000}` ;
  }

  // GET VALUES IN  MILLIONS AND BILLIONS
  getValues(num:number)
  {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + ' Billion USD'; // Billions
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + ' Million USD'; // Millions
    } else {
      return num.toString(); // Less than a million
    }
  }

  // GET PRICE CHART
  historyDataHeaders= new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
   })
   historyDataParams =  {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '1y'
  }
  getPriceChart(id:string)
  {
    return this.http.get(`https://coinranking1.p.rapidapi.com/coin/${id}/history`,{headers:this.historyDataHeaders,params:this.historyDataParams})
  }
  // GET OHLC CHART
  ohlcdataParams={
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    interval: 'day'
  }
  getOhlcChart(id:string)
  {
      return this.http.get(`https://coinranking1.p.rapidapi.com/coin/${id}/ohlc`,{headers:this.historyDataHeaders,params:this.ohlcdataParams})
  }
}
