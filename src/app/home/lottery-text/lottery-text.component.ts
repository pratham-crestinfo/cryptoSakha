import { Component ,Input,OnInit} from '@angular/core';

@Component({
  selector: 'app-lottery-text',
  standalone: true,
  imports: [],
  templateUrl: './lottery-text.component.html',
  styleUrl: './lottery-text.component.css'
})
export class LotteryTextComponent implements OnInit {
  lines: string[] = [
    'Line 1',
    'Line 2',
    'Line 3',
    'Line 4',
    'Line 5'
  ];
  // @Input()
  currentLineIndex: number = -1;
  spinInterval: any;
  animate: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.startLottery();
  }

  startLottery(): void {
    let index = 0;
    this.spinInterval = setInterval(() => {
      this.animate = false; // Reset animation
      setTimeout(() => {
        this.currentLineIndex = index;
        this.animate = true; // Trigger animation
        index = (index + 1) % this.lines.length;
      }, 50); // Small delay to reset animation
    }, 2000); // Change the text every 2000ms
  }
}