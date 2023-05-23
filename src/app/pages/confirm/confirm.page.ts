import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  chosenRoom: any;
  plan: any;

  constructor(public router: Router, public apiService: ApiService) { }

  ngOnInit() {
    console.log(this.apiService.chosenRoom);
    this.chosenRoom = this.apiService.chosenRoom;
    this.plan = this.apiService.plan;
    console.log('this.chosenRoom', this.chosenRoom);

    // テスト用
    this.apiService.setTime();

  }

  toChangePage(url){
    this.router.navigateByUrl(url);
  }

}
