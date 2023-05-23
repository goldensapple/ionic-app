import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  shopId: any;
  planList: any;
  cardNumber: string;
  items: any[];

  constructor(public storageService: StorageService, public apiService: ApiService, public router: Router, private http: HttpClient) { }

  async ngOnInit() {
    this.cardNumber = history.state.cardNumber;
    this.shopId = await this.storageService.onGetClick('shopId');
    // this.planList = await this.apiService.getMasterJson("PLAN", this.shopId);
    this.planList = await this.apiService.getPlans();

    // this.planList = [
    //   { id : 1, name: '30分'}, 
    //   { id : 2, name: '1時間'}, 
    //   { id : 3, name: '2時間'}, 
    //   { id : 4, name: 'ナイト'}, 
    //   { id : 5, name: '5時間'}, 
    //   { id : 5, name: '12時間'}
    // ];
  }
  toNextPageWithPlan(url, plan){
    this.apiService.plan = plan;
    console.log(plan)
    console.log(typeof(plan));
    this.router.navigateByUrl(url);
  }
  toBackPage(url){
    this.router.navigateByUrl(url);
  }
}
