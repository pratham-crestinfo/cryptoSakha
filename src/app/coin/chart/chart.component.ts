import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Params } from '@angular/router';
import { coinDataService } from '../../shared/coindata.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  id: string = '';
  historyData: {
    dates: string[];
    values: number[];
  } = { dates: [], values: [] };

  @Input() colour: string = '';
  constructor(
    private activeroute: ActivatedRoute,
    private coinDataService: coinDataService
  ) {}
  ngOnInit() {
    this.activeroute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getPriceChartData();
  }

  // GETTING CHART DATA
  getPriceChartData() {
    this.coinDataService.getPriceChart(this.id).subscribe({
      next: (res: any) => {
        for (let i = 0; i < res.data.history.length; i++) {
          this.historyData.values.push(res.data.history[i].price);
          this.historyData.dates.push(
            this.coinDataService.getDate(res.data.history[i].timestamp)
          );
        }
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        this.createPriceChart();
      },
    });
  }


  // PRICE CHART
  public chart: any;
  createPriceChart() {
  
    
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: this.historyData.dates.reverse(), // values on X-Axis
        datasets: [
          {
            label: 'Coin Prices',
            borderColor: this.colour,
            data: this.historyData.values.reverse(),
            backgroundColor: this.colour,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          x: {
              ticks: {
                  maxTicksLimit: 7,
                  color:"#9eb3c2",
                  align: 'start', // Align labels to the start (left)
                  padding: 10, // Adjust padding as needed
              },
              grid: {
                color: '#343a40',  // Color of grid lines for x-axis
              },
          },
         y:{
          ticks:{
            color:"#9eb3c2"
          },
          grid: {
            color: '#343a40',  // Color of grid lines for x-axis
          },
         }
      }
      },
    });
  }

  //OHLC CHART
}
