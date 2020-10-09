import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddCartService } from '../../services/add-cart/add-cart.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit,OnDestroy {
  cart_count= 0
  cartCountSubscription:Subscription = null
  constructor(
    private addCartService:AddCartService
  ) { 

    this.cart_count = addCartService.getCartCount()
    this.cartCountSubscription = addCartService.updateCartCountsEmitter.subscribe( data =>{
      console.log(data)
      this.cart_count = data
    })
  }
  ngOnDestroy() {
    this.cartCountSubscription.unsubscribe()
   
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnterTab')
  }

  getCartList =()=>{
    this.addCartService.updateCartList()
  }

}
