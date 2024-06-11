import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newscard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newscard.component.html',
  styleUrl: './newscard.component.css'
})
export class NewscardComponent {
  @Input() element:{createdAt:string,description:string,thumbnail:string,title:string,url:string}={
  createdAt:"",description:"",thumbnail:"",  title:"",  url:""};

  randomIndex=Math.floor(Math.random() * 3)+1;


  gotoNews(url:string)
  {
    // window.location.href = url; // Opens the link in the same tab
    window.open(url, '_blank'); // Uncomment to open the link in a new tab

  }
}
