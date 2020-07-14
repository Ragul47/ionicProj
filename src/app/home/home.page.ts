import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppoinmentgetService } from '../services/appoinmentget.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  detailpageUrl: string = 'home/details';
  Appoinments: any;
  groupedappoinment: any;
  data: string='';

  constructor(private menu: MenuController,
    private Appoinmentget: AppoinmentgetService,
    private route:Router) {
    this.Appoinmentget.getAppoinment(this.data).subscribe( (data) => {
      setTimeout(()=>{ this.data = "" }, 4000)
      this.Appoinments = data;
      this.groupedappoinment = _.groupBy(this.Appoinments, 'day');
 });
  
   }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  public detail(url: any,Appoinment: any){
    this.Appoinmentget.AppoinmentUrl = url;
   this.Appoinmentget.appoinmentDet = Appoinment;
  localStorage.setItem('data',JSON.stringify (Appoinment))
   this.route.navigate(['details']);
  }
}
