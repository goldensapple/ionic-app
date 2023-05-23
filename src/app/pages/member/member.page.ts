import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  qrCode: any;
  cardNumber: string;
  
  constructor(public router: Router, public apiService: ApiService, private alertController: AlertController) { }
  
  ngOnInit() {
    window.addEventListener('keydown', this.qrEnter);
  }
  toNextPage(url){
    this.router.navigateByUrl(url);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '警告',
      // subHeader: '悪いメッセージ',
      message: '会員アプリを見つかりません!',
      buttons: ['わかりました'],
    });

    await alert.present();
  }
  async toNextPageWithCardNumber(url){
    let customer = await this.apiService.getCustomerByCode(this.cardNumber);    
    
    if (customer) {
      const navigationExtras : NavigationExtras = {
        state: {
          cardNumber : this.cardNumber
        }
      }
      this.router.navigateByUrl(url, navigationExtras);
    } else this.presentAlert()
  }

  qrEnter = (event) => {
    console.log('keydown event:' + JSON.stringify(event));
    const keyName = event.key;
    console.log('keyName1:' + keyName);
    console.log('eventCodeKeyDown:' + event.code);
    if (keyName === 'Enter') {
      // バーコードの値
      console.log('this.qrCodeEnter:' + this.qrCode);
      // 決済処理
      // this.requestQR(this.qrCode);
      // 入力クリア
      this.qrCode = '';
      window.removeEventListener('keydown', this.qrEnter);
    } else {
      // バーコード1桁ごとにイベントが発生するので連結していく
      console.log('keyName2:' + keyName);
      console.log('this.qrCode2:' + keyName);

      this.qrCode += keyName;
      console.log('keyName3:' + keyName);
      console.log('this.qrCode3:' + keyName);
    }

  }

}
