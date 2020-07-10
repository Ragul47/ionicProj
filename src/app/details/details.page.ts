import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppoinmentgetService } from 'src/app/services/appoinmentget.service';
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
  constructor(private activatedRoute: ActivatedRoute,
    private Appoinmentget: AppoinmentgetService) {
     // this.practionerget.getDetailPractioner(this.practionerget.practionerUrl)
//      this.Appoinmentget.getAppoinmentDetail(this.data).subscribe( (data) => {
//        this.detailedAppoinment = data;
 
//  });
     }

  ngOnInit() {
  this.detailedAppoinment=JSON.parse(localStorage.getItem('data'))
  }

}
