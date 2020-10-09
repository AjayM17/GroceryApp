import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { HttpService } from '../../services/http/http.service'
 import { AddCartService } from '../../services/add-cart/add-cart.service'
 import { StorageService } from '../../services/storage/storage.service'
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit ,OnDestroy {
  
  quanity_value = 0.5
  total_cost = 0
  item_cost = 0
  cart_count = 0
  
  user_details = null

  @Input() product_details: any;
  @Input() IMAGES_BASE_URL:string;
  @Input() storageService:StorageService;
  @Input() addCartService:AddCartService;

  constructor(
    //  private httpService: HttpService,
    // private addCartService: AddCartService,
    // private storageService:StorageService,
    public modalController: ModalController,
    private router: Router,
    
    ) {
      
   }


   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
    console.log(this.product_details)
     this.item_cost = parseInt(this.product_details['price'])
     this.totalCost()
  }

  totalCost = () => {
    this.total_cost = this.item_cost * this.quanity_value

  }

  addToCart = () => {
    const param ={
      product_id : this.product_details['id'],
      product_name:this.product_details['name'],
      product_price:parseInt(this.product_details['price']),
      product_image:this.product_details['a_img'],
      quanity_value:this.quanity_value,
      product_quantity:this.quanity_value
    }
    this.addCartService.addItemIntoCart(param)
    this.storageService.presentToast('Item Added')
  }

  increaseQuanity = () => {
   this.quanity_value = this.quanity_value + 0.5
   this.totalCost()
  }

  desceaseQuantity = () => {
    if(this.quanity_value > 0.5) {
      this.quanity_value = this.quanity_value - 0.5
      this.totalCost()
    }
  } 

  goToPlaceOrder = () =>{
    const items = [{
      product_id : this.product_details['id'],
      product_name:this.product_details['name'],
      product_price:parseInt(this.product_details['price']),
      product_image:this.product_details['a_img'],
      quanity_value: 1,
      product_quantity:1
    }]
    const params ={
      delivery_time: '11 AM',
      delivery_date:new Date(),
      items :JSON.stringify(items)
    }
    let navigationExtras: NavigationExtras = {
      queryParams: params,
      skipLocationChange: true
    }
    this.dismiss()
    this.router.navigate(['/place-order'], navigationExtras)
  }

  placeOrder = () => {
    console.log(this.product_details)
    const details ={
      product_id : this.product_details['id'],
      product_name:this.product_details['name'],
      product_price:parseInt(this.product_details['price']),
      product_image:this.product_details['a_img'],
      product_quantity:this.quanity_value
    }
    const params ={
      "user_id":this.user_details['user_id'],
       "total_amount":this.total_cost,
       "cart_items":[details]
    }

    // this.storageService.presentLoading()
    console.log(params)
    // this.httpService.postRequest('orders',params).subscribe( data => {
    //   console.log(data)
    //   if(data['success']){
    //     // this.storageService.presentToast('Order Placed')
    //   //  this.addCartService.setCartItems([])
    //   //  this.cart_items=[]
    //   }
    //   // this.storageService.dismissLoading()
    // }, err => {
    //   console.log(err)
    //   //  this.storageService.dismissLoading()

    // })
   
  }

  ngOnDestroy(){
    // this.addCartService.carCountSubscriber.unsubscribe()
  }
}
