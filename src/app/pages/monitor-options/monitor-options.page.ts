import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-monitor-options',
  templateUrl: './monitor-options.page.html',
  styleUrls: ['./monitor-options.page.scss'],
})
export class MonitorOptionsPage implements OnInit {
  smoke: any;
  pc: any;
  plan: any;
  type: any;
  roomName: any;
  floorName: any;
  dvdAmount: any;
  memberInfo: any;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    const decidedPlan = this.apiService.plan
    const chosenRoom = this.apiService.chosenRoom

    if(decidedPlan){
      this.plan = decidedPlan
    }
    if(chosenRoom){
      this.type = chosenRoom.type_id;
      this.smoke = chosenRoom.smoking_type_id;
      this.pc = chosenRoom.pc_type_id;
      this.roomName = chosenRoom.room_name;
      this.floorName = chosenRoom.floor_id;
    }
  }

}
