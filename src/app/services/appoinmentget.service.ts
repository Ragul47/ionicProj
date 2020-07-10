import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Appoinment } from '../modal/appoinmentlistmodel'
// import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentgetService {

  Appoinmentlist: Appoinment[] = [];
  AppoinmentUrl: string = '';
  appoinmentDetail: Appoinment = {
    detailurl: '',
    Patientname: '',
   
   startdatetime:'',
   enddatetime: '',
   Practionername:'',
   locationname:'',
   Age:'',
   Birthdate:'',
   AppDescription:'',
   speciality:'',
   day:'',
   description: ''
  };
  appoinmentDet: Appoinment;
  

  constructor(
    private http: HttpClient) { }

  public getAppoinment(data: any): Observable<any> {
    this.Appoinmentlist = [];
    return this.http.get('http://hapi.fhir.org/baseR4/Appointment?_pretty=true').pipe(map((data: any) => {
      try {
        let responseJSon = data;

        if (data && data.entry) {
          data.entry.forEach((appoinment, index) => {
              let Appoinment1: Appoinment = {
                detailurl: '',

                Patientname: '',
                speciality:'',

                startdatetime: '',
                enddatetime: '',
                Age:'',
                Birthdate:'',
                AppDescription:'',
                day:'',

                Practionername: '',
                locationname: '',

                description:''

              }
              Appoinment1.detailurl = appoinment.fullUrl;
              appoinment = appoinment.resource;

              Appoinment1.startdatetime = appoinment.start ? appoinment.start : '';
              Appoinment1.Patientname= appoinment && appoinment.participant && appoinment.participant[0].actor && appoinment.participant[0].actor.display ? appoinment.participant[0].actor.display : '';
              Appoinment1.Practionername=appoinment && appoinment.participant && appoinment.participant[1].actor && appoinment.participant[1].actor.display ? appoinment.participant[1].actor.display : '';
             
              let datee = new  Date (Appoinment1.startdatetime);

              Appoinment1.description = appoinment.description;

              
           
              var today = (datee).getDay();
              Appoinment1.day=this.getDay(today);

              this.Appoinmentlist.push(Appoinment1);

          });
        }



        return this.Appoinmentlist;
      } catch (e) {
        throw (<Error>e).message + ' in API response ';
      }
    }));
  }

  public getDay(date: any){
    switch (date) {
      case 1:
          return 'monday'
          break;
      case 2:
        return 'tuesday'
        break;
      case 3:
        return 'wednesday'
        break;
      case 4:
        return 'thursday'
        break;
      case 5:
        return 'friday'
        break;
      case 6:
        return 'saturday'
        break;
      case 7:
        return 'sunday'
        break;
      default:
        return 'invalid'
  }
  }



 

  
public getAppoinmentDetail(data: any): Observable<any>{
  return this.http.get(this.AppoinmentUrl).pipe(map((data: any)=>{
  if(data){
 
  this.appoinmentDetail = this.appoinmentDet;
  this.appoinmentDetail.enddatetime = data.end;
  }
  return this.appoinmentDetail;
  }));
  }
}
