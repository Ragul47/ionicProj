import { Component, OnInit } from '@angular/core';
import { Appoinment } from 'src/app/modal/appoinmentlistmodel';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  url: any;
  data: '';
  detailedAppoinment: Appoinment;
  constructor() {
     }

  ngOnInit() {
  this.detailedAppoinment=JSON.parse(localStorage.getItem('data'))
  }
  openTab(latitude: string,longitude: string){
    if(latitude && longitude){
      let url = 'https://www.google.com/maps/place/'+latitude+','+latitude;
      window.open(url,'_blank');
    }
    else{
      window.open('https://www.google.com/maps/place/13.039682, 80.279376','_blank');
    }
  }

}