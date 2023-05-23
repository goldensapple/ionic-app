import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.page.html',
  styleUrls: ['./rental.page.scss'],
})
export class RentalPage implements OnInit {
  products: any;
  qrCode: any;
  selectedProductIds: any = [];
  selectedProducts: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  query: string = '';
  tableSizes: any = [10, 20, 30, 50];

  constructor(public apiService: ApiService, public router: Router) { }

  async ngOnInit() {
    window.addEventListener('keydown', this.qrEnter);
    this.fetchProducts();
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

  async fetchProducts() {
    this.query = this.query.trim();
    
    let productInfo: any = await this.apiService.getProductsByPage(this.page, this.tableSize, this.query);
    this.products = productInfo.data;
    this.count = productInfo.total;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchProducts();
  }
  onTableSizeChange(event: any): void {
    this.page = 1;
    this.fetchProducts();
  }
  toChangeCheck(event: any, product: any) {
    var index = this.selectedProductIds.indexOf(product.id);
    if (index >= 0) {
      this.selectedProductIds.splice(index, 1);
      this.selectedProducts.splice(index, 1);
      event.target.closest('.trow').style.backgroundColor = 'white';
    } else {
      this.selectedProductIds.push(product.id);
      this.selectedProducts.push(product);
      event.target.closest('.trow').style.backgroundColor = 'lightgreen';
    }    
  }
  toBackPage(url){
    this.router.navigateByUrl(url);
  }

  toNextPageWithProducts(url){
    // テスト用
    // if(!this.products){
    //   this.products = [
    //     {
    //       name: 'サンプルDVD1',
    //       barcode: '1111111111111',
    //       price: 0,
    //       amount: 1
    //     },
    //     {
    //       name: 'サンプルDVD2',
    //       barcode: '2222222222222',
    //       price: 0,
    //       amount: 1
    //     },
    //     {
    //       name: 'サンプルDVD2',
    //       barcode: '2222222222222',
    //       price: 0,
    //       amount: 1
    //     },
    //     {
    //       name: 'サンプルDVD2',
    //       barcode: '2222222222222',
    //       price: 0,
    //       amount: 1
    //     },
    //     {
    //       name: 'サンプルDVD2',
    //       barcode: '2222222222222',
    //       price: 0,
    //       amount: 1
    //     },
    //     {
    //       name: 'サンプルDVD2',
    //       barcode: '2222222222222',
    //       price: 0,
    //       amount: 1
    //     },
    //     {
    //       name: 'サンプルDVD2',
    //       barcode: '2222222222222',
    //       price: 0,
    //       amount: 1
    //     }
    //   ]
    // }
    
    
    // // 
    this.apiService.products = this.selectedProducts;
    // console.log('products:', this.products);
    this.router.navigateByUrl(url);
  }
}
