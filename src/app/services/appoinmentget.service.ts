import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Appoinment } from '../modal/appoinmentlistmodel'


@Injectable({
  providedIn: 'root'
})
export class AppoinmentgetService {

  Appoinmentlist: Appoinment[] = [];
  AppoinmentUrl: string = '';
  appoinmentDet: Appoinment;


  constructor(
    private http: HttpClient) { }

  public getAppoinment(data: any): Observable<any> {
    this.Appoinmentlist = [];

    let url = 'http://hapi.fhir.org/baseR4/Appointment?_include=Appointment:location&_include=Appointment:patient&_include=Appointment:practitioner&_pretty=true';
    return this.http.get(url).pipe(map((data: any) => {
      try {

        if (data && data.entry) {
          data.entry.forEach((appoinment, index) => {
            let Appoinment1: Appoinment = {
              detailurl: '',
              appoinmentId: '',

              Patientname: '',
              patientId: '',

              Practionername: '',
              PractionerId:'',

              locationname: 'unknown', 
              locationId: '',
              latitude: '',
              longitude: '',

              startdatetime: '',
              enddatetime: '',

              Age: 'unknown',
              Birthdate: 'unknown',
              day: '',
              speciality: 'unknown',
              description: 'known'

            }
            Appoinment1.detailurl = appoinment.fullUrl;
            appoinment = appoinment.resource;
            if(appoinment.resourceType == 'Appointment'){

              Appoinment1.appoinmentId = appoinment.id;

              Appoinment1.startdatetime = appoinment.start ? appoinment.start : '';
              Appoinment1.enddatetime = appoinment.end ? appoinment.end : '';

              let patapp = appoinment.participant.find(ext => ext.actor.reference.includes('Patient'));
              let patref = patapp.actor.reference+ '';
              let patid = patref.split('/');
              Appoinment1.patientId = patid[1] ? patid[1]:'';

              let practapp = appoinment.participant.find(ext => ext.actor.reference.includes('Practitioner'));
              let practref = practapp.actor.reference+ '';
              let practid = practref.split('/');
              Appoinment1.PractionerId =practid?practid[1]:'';

              let locationapp = appoinment.participant.find(ext => ext.actor.reference.includes('Practitioner'));
              let locationref = locationapp.actor.reference+ '';
              let locationid = locationref.split('/');
              Appoinment1.locationId = locationid?locationid[1]:'';

              Appoinment1.locationname = 'unknown'

              let datee = new Date(Appoinment1.startdatetime);
              var today = (datee).getDay();
              Appoinment1.day = this.getDay(today);
              Appoinment1.description = appoinment.description? appoinment.description :'unknown';

              this.Appoinmentlist.push(Appoinment1);

            }
            else if (appoinment.resourceType == 'Patient'){
              let index = this.Appoinmentlist.findIndex(x=>x.patientId === appoinment.id);
              if(index>=0){
                let familynamme =  appoinment.name && appoinment.name[0] && appoinment.name[0].family ? appoinment.name[0].family : '';
                let forename = appoinment.name && appoinment.name[0] && appoinment.name[0].given && appoinment.name[0].given[0] && appoinment.name[0].given[0] ? appoinment.name[0].given[0] : ''
                let surname = appoinment.name && appoinment.name[0] && appoinment.name[0].given && appoinment.name[0].given[0] && appoinment.name[0].given[1] ? appoinment.name[0].given[1] : ''
                let patientname = familynamme+' '+forename+' '+surname;
                let birthDate = appoinment.birthDate;
                this.Appoinmentlist[index].Patientname = patientname;
                this.Appoinmentlist[index].Birthdate = birthDate ? birthDate : 'unknown';
              }
            }
            else if(appoinment.resourceType == 'Practitioner'){
              let index = this.Appoinmentlist.findIndex(x=>x.PractionerId === appoinment.id);
              if(index>=0){
                let familynamme =  appoinment.name && appoinment.name[0] && appoinment.name[0].family ? appoinment.name[0].family : '';
                let forename = appoinment.name && appoinment.name[0] && appoinment.name[0].given && appoinment.name[0].given[0] && appoinment.name[0].given[0] ? appoinment.name[0].given[0] : ''
                let surname = appoinment.name && appoinment.name[0] && appoinment.name[0].given && appoinment.name[0].given[0] && appoinment.name[0].given[1] ? appoinment.name[0].given[1] : ''
                let Practionername = familynamme+' '+forename+' '+surname;
                this.Appoinmentlist[index].Practionername = Practionername;
              }
              
            }
            else if(appoinment.resourceType =='Location') {
              let index = this.Appoinmentlist.findIndex(x=>x.PractionerId === appoinment.id);
              if(index>=0){

                this.Appoinmentlist[index].latitude = appoinment.latitude ? appoinment.latitude : '';
                this.Appoinmentlist[index].longitude = appoinment.longitude ? appoinment.longitude: '';
              }
            }
          });
        }



        return this.Appoinmentlist;
      } catch (e) {
        throw (<Error>e).message + ' in API response ';
      }
    }));
  }

  public getDay(date: any) {
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

}
