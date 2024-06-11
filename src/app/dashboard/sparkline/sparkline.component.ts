import { ActivatedRoute } from '@angular/router';
import { coinDataService } from '../../shared/coindata.service';
import { Params } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sparkline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.css'
})
export class SparklineComponent {
  public chart: any;
  // @Input() data:number[];
  data:number[]= [
    9515.0454185372,
    9540.1812284677,
    9554.2212643043,
    9593.571539283,
    9592.8596962985,
    9562.5310295967,
    9556.7860427046,
    9388.823394515,
    9335.3004209165,
    9329.4331700521,
    9370.9993109108
]
  // @Input() id:string;
  ngOnInit()
  {
    // console.log(this.data)
    // this.id=Math.random().toString();
    // this.createsparkline();
    this.createsparkline();
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   // console.log(this.data.length)
  //   if (changes['data'] || this.data.length || changes['id']) {
  //     // this.createsparkline();
  //   }
  // }
  ngAfterViweInit(){
     this.createsparkline();
  }

   createsparkline() {
    // Log the length of the data
    console.log(this.data.length);
  
    // Get the canvas element and assert its type to HTMLCanvasElement
  const canvas = document.getElementById("abc") as HTMLCanvasElement;

  // Check if the canvas element is found and has the correct type
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  // Get the 2D drawing context of the canvas
  const ctx = canvas.getContext("2d");

  // Ensure the context is valid
  if (!ctx) {
    console.error("Failed to get 2D context");
    return;
  }
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, 'rgba(75, 192, 192, 1)'); // Starting color
  gradient.addColorStop(0.99, 'rgba(0, 0, 0, 1)'); // Ending color (black)
    // Create a new Chart instance
    new Chart(ctx, {
      type: 'line',
      data: {
        labels:this. data.map((_, index) => index.toString()), // Values on X-Axis
        datasets: [{
          label: 'Coin Prices',
          data: this.data,
          borderColor:"blue",
          backgroundColor: gradient,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        aspectRatio: 3,
        scales: {
          x: {
            display: false, // Hide x-axis
          },
          y: {
            display: false, // Hide y-axis
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        elements: {
          line: {
            tension: 1, // Smooth the line
          },
          point: {
            radius: 0,
          },
        },
        animation: {
          duration: 0.3, // Fast animation
        },
      },
    });
  }
  

























  // createsparkline()
  // {
  //   // console.log(this.id)
  //   console.log(this.data.length)
  //   this.chart = new Chart("abc", {
  //     type: 'line',
  //     data: {
  //       labels: this.data.map((_, index) => index.toString()), // values on X-Axis
  //       datasets: [
  //         {
  //           label: 'Coin Prices',
  //           data: this.data,
  //         },
  //       ],
  //     },
  //      options: {
  //       responsive: true,
  //       // maintainAspectRatio: false,
  //       aspectRatio:7,
  //       scales: {
  //         x: {
  //           display: false, // Hide x-axis
  //         },
  //         y: {
  //           display: false, // Hide y-axis
  //         },
  //       },
  //       plugins: {
  //         legend: {
  //           display: false, // Hide legend
  //         },
  //       },
  //       elements: {
  //         line: {
  //           tension: 0.4, 
  //         // Smooth the line
  //         },
  //         point: {
  //           radius: 0,
  //         },
  //       },
  //       animation: {
  //         duration: 0.3, // Disable animation for a more immediate effect
  //       },
  //   }});
  // }
}
