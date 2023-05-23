import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { apiUrl } from '../../api/api.dev';

// const headers = new HttpHeaders({
//   'x-api-key': environment.apiToken,
//   'content-type': 'application/json',
// });
const headers = {
  'x-api-key': environment.apiToken,
  // 'Access-Control-Allow-Origin': '*',
};

interface Data {
  data: any[];
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  plan: any;
  products: any;
  chosenRoom: any;

  startTime: any;
  endTime: any;

  constructor(public http: HttpClient) { }

  getMasterJson = (operationType, shopId?) => new Promise(resolve => {
    const body = {
      "OperationType": operationType,
      "ShopId": shopId
    };
    this.http.post(environment.apiUrl, body, {headers}).subscribe(data => {
      resolve(data);
    },
    err => {
      console.log(err);
    });
  });

  removeProducts(){
    this.products.length = 0;
  }

  setTime(){
    const now = new Date();
    const nowEnd = new Date();

    const nowHours = now.getHours() < 10? '0' + now.getHours() : now.getHours();
    const nowMinutes = now.getMinutes() < 10? '0' + now.getMinutes() : now.getMinutes();

    nowEnd.setMinutes(now.getMinutes() + this.plan.use_minutes);
    console.log(this.plan);
    console.log('this.plan.use_minutes:', this.plan.use_minutes);
    const nowEndHours = nowEnd.getHours() < 10? '0' + nowEnd.getHours() : nowEnd.getHours();
    const nowEndMinutes = nowEnd.getMinutes() < 10? '0' + nowEnd.getMinutes() : nowEnd.getMinutes();

    this.startTime = String(nowHours) + ':' + String(nowMinutes);
    this.endTime = String(nowEndHours) + ':' + String(nowEndMinutes);
    console.log('this.startTime:', this.startTime);
    console.log('this.endTime:', this.endTime);
  }

  getPlans = () => new Promise(resolve => {
    this.http.get<Data>(apiUrl + '/api/plans').subscribe(data => {
      resolve(data.data);
    },
    err => {
      console.log(err);
    });
  });

  getRoomTypes = () => new Promise(resolve => {
    this.http.get<Data>(apiUrl + '/api/room_types').subscribe(data => {
      resolve(data.data);
      console.log(data.data);
      
    },
    err => {
      console.log(err);
    });
  });

  getCustomerByCode = (code: string) => new Promise(resolve => {
    const body = {
      "keyword": code
    };
    this.http.post(apiUrl + '/api/code_check', body).subscribe(data => {      
      resolve(data);
    },
    err => {
      console.log(err);
    });
  });
  
  getRooms = () => new Promise(resolve => {
    this.http.get<Data>(apiUrl + '/api/rooms').subscribe(data => {
      resolve(data.data);
    },
    err => {
      console.log(err);
    });
  });

  getProductsByPage = (page: any, tableSize: any, query: any) => new Promise(resolve => {
    const body = {
      page: page,
      tableSize: tableSize,
      searchText: query      
    };
    this.http.post(apiUrl + '/api/products', body).subscribe(data => {      
      resolve(data);     
    },
    err => {
      console.log(err);
    });
  });
}
