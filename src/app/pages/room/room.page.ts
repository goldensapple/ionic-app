import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from '../../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  plan: any;
  typeList: any;
  shopId: any;
  roomPriceList: any;
  locationList: any;
  roomList: any;
  optionTabacco = 2;
  optionComputer = 1;
  optionRoomType = 0;
  roomTypeList: any;
  imageUrl = environment.roomTypeImageUrl;
  filterRoomIds = [];
  selectedRoomId = 0;

  constructor(public apiService: ApiService,
     public storageService: StorageService,
     public router: Router,
     private renderer: Renderer2,
     private el: ElementRef,
     private toastController: ToastController) { }

  async ngOnInit() {
    // this.plan = this.apiService.plan;
    // this.plan = this.apiService.plan.id;
    // this.shopId = await this.storageService.onGetClick('shopId');
    // this.typeList = await this.apiService.getMasterJson("TYPE", this.shopId);
    // this.roomPriceList = await this.apiService.getMasterJson("ROOM_PRICE", this.shopId);
    this.roomTypeList = await this.apiService.getRoomTypes();
    this.roomList = await this.apiService.getRooms();
    console.log(this.roomList);
    
    
    if (this.roomTypeList) {
      this.optionRoomType = this.roomTypeList[0].id;
    }
    // this.locationList = await this.apiService.getMasterJson("LOCATION", this.shopId);
    // this.locationList = [
    //   { room_id : 1, room_name: 'ソファー'}, 
    //   { room_id : 2, room_name: 'ベッド'}, 
    //   { room_id : 3, room_name: 'マット'}, 
    //   { room_id : 4, room_name: '和室'}, 
    //   { room_id : 5, room_name: 'VIP'}, 
    //   { room_id : 6, room_name: 'VIP'}
    // ];
    // this.roomList = await this.apiService.getMasterJson("ROOM", this.shopId);



    // this.typeList.map((type) => {
    //   this.roomPriceList.map(roomPrice => {
    //     if(roomPrice.plan_id == this.plan && roomPrice.type_id == type.id){
    //       type.room_price = roomPrice.price;
    //     }
    //   })
    // })

    // this.roomList.map(room => {
    //   this.typeList.map(type => {
    //     if(room.type_id === type.id){
    //       room.room_price = type.room_price
    //     }
    //   })
    // })

    // console.log('this.typeList:', this.typeList);
    // console.log('this.locationList:', this.locationList);
    // console.log('this.roomList:', this.roomList);
    // console.log('this.roomPriceList:', this.roomPriceList);


    // this.locationList.map(location => {
    //   if(location.room_id === null){
    //     location.room_name = null
    //   }else{
    //     this.roomList.map(room => {
    //       if(location.room_id === room.id){
    //         location.room_name = room.name;
    //         location.room_price = room.room_price;
    //         location.smoking_type_id = room.smoking_type_id;
    //         location.pc_type_id = room.pc_type_id;
    //         location.type_id = room.type_id;
    //         console.log('room info set to location');
    //       }
    //     })
    //   }
    // })

    // const elements = document.getElementsByClassName('blank-button');
    // while (elements.length) {
    //   elements.item(0).remove();
    // }

    



  }

  async addPriceToTypeList(type){
    // const roomPriceList: any = await this.apiService.getMasterJson("ROOM_PRICE", this.shopId);
    this.roomPriceList.map((roomPrice) => {
      console.log(roomPrice.plan_id)
      console.log(this.plan)
      console.log(roomPrice.plan_id == this.plan)
      console.log(this.typeList)

      // if(roomPrice.plan_id == this.plan && roomPrice.type_id == type){
      //   return roomPrice.price;
      // }
    })

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'お部屋を選択してください',
      duration: 1500,
      color: 'warning',
      position: 'top',
    });

    await toast.present();
  }

  toNextPageWithRoom(url) {
    if (this.selectedRoomId != 0) {
      let roomPrice = this.roomTypeList.find((item) => item.id == this.optionRoomType);
      let room = this.roomList.find((item) => item.id == this.selectedRoomId);
      this.apiService.chosenRoom = {...room, room_price:roomPrice.price};
      this.router.navigateByUrl(url);
    } else {
      this.presentToast()
    }
  }

  toSetTabacco() {
    console.log('tobacco: '+this.optionTabacco);
    this.selectedRoomId = 0;
    
  }

  toSetComputer() {
    console.log('computer: '+this.optionComputer);
    this.selectedRoomId = 0;
  }

  toSetRoomType(id) {
    this.optionRoomType = id;
    console.log('room type: '+this.optionRoomType);
    this.selectedRoomId = 0;
  }

  toBackPage(url){
    this.router.navigateByUrl(url);
  }

  toChangePart() {
    const element1 = this.el.nativeElement.querySelector('#room-type-select');
    const element2 = this.el.nativeElement.querySelector('#room-list');
    if (element1.classList.contains('hide')) {
      this.renderer.removeClass(element1, 'hide');
      this.renderer.addClass(element2, 'hide');
    } else {
      let rooms = this.roomList.filter((item) => item.smoking_type_id == this.optionTabacco && 
                                                  item.pc_type_id == this.optionComputer &&
                                                  item.type_id == this.optionRoomType);
      this.filterRoomIds = rooms.map((item) => {return item.id});
      
      this.renderer.removeClass(element2, 'hide');
      this.renderer.addClass(element1, 'hide');
    }
  }

  toSelectRoom(id) {
    this.selectedRoomId = id;
  }

}
