import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PrintService } from 'src/app/services/print.service';
import { PaymentService } from 'src/app/services/payment.service';
// import { CashService } from 'src/app/services/cash.service';
import { ModalController } from '@ionic/angular';
// import { ReportModalPage } from '../../pages/report-modal/report-modal.page';
import { AlertMessagePage } from '../../pages/alert-message/alert-message.page';
import { LogService } from 'src/app/services/log.service';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';
import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';



//　売上処理、プリンター設定、日計、中間計等のボタンがある設定画面です。
// このページでプリンター、キッチンプリンター、釣銭機の接続を行い、状態の確認と通知を行います。

// const headers = new HttpHeaders({
//   'x-api-key': environment.apiToken,
//   'Access-Control-Allow-Origin': '*',
//   'Content-Type': 'application/json',
// });


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {



  testJson2: any;

  kitchenPrinterIP: any;
  catIP: any;
  amountLimits: any;
  logStorage: any;
  isAvailable = false;
  passwordNum: any;
  trainingMode: boolean;

  shopId: any;
  shopsListMaster: any;


  // @ViewChild('report', {static: false, read: ElementRef})fab: ElementRef;


  constructor(public router: Router, public printService: PrintService, public paymentService: PaymentService, public modalCtrl: ModalController, public logService: LogService, private update: SwUpdate, private connectionService: ConnectionService, public storage: Storage, public http: HttpClient, public apiService: ApiService) { }

  async ngOnInit() {
    // this.shopsListMaster = await this.apiService.getShops();
    this.shopsListMaster = await this.apiService.getMasterJson("SHOP");
    console.log(this.shopsListMaster);
    console.log(JSON.stringify(this.shopsListMaster));



    const onlineStatus = window.navigator.onLine;
    console.log('window.navigator.onLine' + window.navigator.onLine);
    if (onlineStatus === false){
      (document.getElementById('order-button') as any).disabled = false;
      (document.getElementById('update-message') as any).innerHTML = 'POSアプリはオフラインです。アップデートの確認ができません。';
    }


    window.addEventListener('load', () => {
      const reloading = sessionStorage.getItem('reloading');
      if (reloading){
        console.log('reload function called');
        (document.getElementById('update-message') as any).innerHTML = 'アップデート完了しました。';
        sessionStorage.removeItem('reloading');
        (document.getElementById('order-button') as any).disabled = false;
      }
    });







    this.updateClient();

    this.kitchenPrinterIP = await this.printService.onGetClick('kitchenPrinterIP');
    this.catIP = await this.paymentService.onGetClick('catIP');
    this.logStorage = await this.paymentService.onGetClick('logStorage');
    this.amountLimits = await this.paymentService.onGetClick('amountLimits');

    if (!this.kitchenPrinterIP){
      await this.printService.onSetClick('kitchenPrinterIP', '127.0.0.1');
    }
    if (!this.catIP){
      await this.printService.onSetClick('catIP', '192.168.1.214');
    }
    if (!this.logStorage){
      await this.printService.onSetClick('logStorage', []);
    }
    if (!this.amountLimits){
      const limitInit = {
        '1円': '20',
        '5円': '20',
        '10円': '20',
        '50円': '20',
        '100円': '20',
        '500円': '10',
        '1000円': '10',
        '5000円': '5',
        '10000円': '5'
      };
      await this.printService.onSetClick('amountLimits', limitInit);

    }

    // this.logStorage = await this.paymentService.onGetClick('logStorage');
    // this.logStorage.push({"name": "test"});
    // console.log(this.logStorage);

    this.printService.setLocalPrinter();
    await this.printService.connect();

    this.printService.sleep(10000).then( () => {
      if (this.isAvailable === false){
        console.log('最新版です。');
        (document.getElementById('order-button') as any).disabled = false;
        if (this.printService.isCashChangerConnected === true){
          (document.getElementById('order-button') as any).disabled = false;
        } else if(this.printService.isPrinterConnected === false){
          // document.getElementById('connect-alert').innerHTML = 'プリンター、キッチンプリンター、釣銭機に接続できておりません。';
          document.getElementById('connect-alert').innerHTML = 'プリンター、釣銭機に接続できておりません。';
        // } else if(this.printService.isKitchenPrinterConnected === false){
        //   document.getElementById('connect-alert').innerHTML = 'キッチンプリンター、釣銭機に接続できておりません。';
        } else if(this.printService.isCashChangerConnected === false){
          document.getElementById('connect-alert').innerHTML = '釣銭機に接続できておりません。';
        }
        (document.getElementById('update-message') as any).innerHTML = 'POSアプリは既に最新版です。';
      }
    });
    
    this.trainingMode = this.paymentService.trainingMode;
    console.log(this.trainingMode);

    if(this.trainingMode){
      (document.getElementById('trainingMode') as any).checked = true;
    }else{
      (document.getElementById('trainingMode') as any).checked = false;
    }


  }

  onSetClick(key: string, value: string){
    console.log('onSetClick() called ' + value);
    this.storage.set(key, value);
    console.log((value));
  }

  // getShops = () => new Promise(resolve => {
  //   // headers.append('Access-Control-Allow-Origin' , '*');
  //   const body = {"OperationType": "SHOP"}
  //   // this.http.get(environment.apiUrl + '/products', {headers}).subscribe(data => {
  //   this.http.post(environment.apiUrl, body,{headers}).subscribe(data => {
  //   resolve(data); },
  //   err => {
  //   console.log(err);
  //   });
  // });

  modeChange(){
    console.log('before modeChange' + this.paymentService.trainingMode);
    console.log('before modeChange' + (document.getElementById('trainingMode') as any).checked);

    if ((document.getElementById('trainingMode') as any).checked === true){
      this.paymentService.trainingMode = true;
      console.log('true!!!')
    }else{
      this.paymentService.trainingMode = false;
      console.log('false!!!')

    }
    console.log('after modeChange' + this.paymentService.trainingMode);
  }


  async openAlertMessage(){
    let modal = await this.modalCtrl.create({
      component: AlertMessagePage,
      cssClass: 'alert-message'
    });
    modal.present();

  }

  passwordTest(){
    if(this.passwordNum === '1111') this.toWelcomePage()
  }

  passwordNumInput(value){
    if (!this.passwordNum) {
      this.passwordNum = value;
    }else{
      this.passwordNum += value;
    }
    
  }

  passwordClear(){
    this.passwordNum = undefined
  }

  async printRetry(){
    this.paymentService.browserCheck();
    this.paymentService.getFullFeaturedWorker();
    await this.paymentService.vescaInit().then(res => console.log('vescaInit():' + res));

    await this.paymentService.doMaintenance('printRetry');
  }

  updateClient = () => {
    if (!this.update.isEnabled){
      console.log('Not Enabled');
      return;
    }
    this.update.available.subscribe(event =>{
      console.log(`current`, event.current, `available`, event.available);
      // (document.getElementById('order-button') as any).disabled = true;
      (document.getElementById('update-message')).removeAttribute('hidden');

      console.log('available called');
      this.isAvailable = true;

      sessionStorage.setItem('reloading', 'true');

      // if (confirm('update available for the app please confirm')) {
      this.update.activateUpdate().then(() => location.reload());
      // }
    }, error => {
      console.log('available error' + error);
    });

    // this.update.checkForUpdate().then(res => {
    //   console.log(res);
    // });

    console.log('updateClient()');
    console.log(this.update.available);
    

    this.update.activated.subscribe(event => {
      console.log(`previous`, event.previous, `current`, event.current);
      (document.getElementById('order-button') as any).disabled = false;
      (document.getElementById('update-message') as any).innerHTML = 'POSアプリを最新版にアップデートしています。';
      sessionStorage.setItem('reloading', 'true');
    }, error => {
      console.log('activated error' + error);
    });

  }

  toWelcomePage(){
    this.router.navigateByUrl('welcome');
  }

  toSettingsPrinter(){
    this.router.navigateByUrl('settings/settings-printer');
  }

  async dailyReportTest(){
    this.openAlertMessage();
    
  }

  async midReportTest(){
    this.paymentService.setIsReport();
    this.paymentService.browserCheck();
    this.paymentService.getFullFeaturedWorker();
    await this.paymentService.vescaInit().then(res => console.log('vescaInit():' + res));

    this.paymentService.midReport();
  }

  intervalReceiptForReport(){
    if (this.paymentService.merchantReceipt !== undefined){
      this.printService.receiptForReport();
      
    }
  }

}
