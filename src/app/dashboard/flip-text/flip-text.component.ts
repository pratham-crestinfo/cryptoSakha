import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flip-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-text.component.html',
  styleUrl: './flip-text.component.css'
})
export class FlipTextComponent implements OnInit {
  // lines: string[] = [
  //   'Line 1',
  //   'Line 2',
  //   'Line 3',
  //   'Line 4',
  //   'Line 5'
  // ];
  @Input() lines:string[];
  currentLineIndex: number = -1;
  spinInterval: any;
  animateUp: boolean = false;
  animateDown: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.startLottery();
  }

  startLottery(): void {
    let index = 0;
    this.spinInterval = setInterval(() => {
      this.animateUp = false;
      this.animateDown = false;

      setTimeout(() => {
        this.currentLineIndex = index;
        if (index % 2 === 0) {
          this.animateUp = true;
        } else {
          this.animateDown = true;
        }
        index = (index + 1) % this.lines.length;
      }, 50); // Small delay to reset animation
    }, 2000); // Change the text every 2000ms
  }
}