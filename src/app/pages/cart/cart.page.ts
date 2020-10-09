import { Component, OnInit } from '@angular/core';
import { AddCartService } from '../../services/add-cart/add-cart.service'
import { HttpService } from '../../services/http/http.service'
import { StorageService } from '../../services/storage/storage.service'
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart_items = []
  cartListSubscription:Subscription = null
  IMAGES_BASE_URL = null
  total_amount = 0
  user_details = null
  delivery_dates = []
  delivery_time = ['9am - 10am','10am - 11am', '11am - 12pm','3pm - 4pm','4pm - 5pm','5pm - 6pm']
  today_date= new Date()
  showDateDropdown = false
  showTimeDropdown = false
//  user_details = null
  selected_delivery_date = new Date()
  selected_delivery_time = '9am - 10am'
  delivery_address = ""
  constructor(private addCartService: AddCartService,
    private httpService: HttpService,
    private router: Router,
     storageService: StorageService,
    private menu: MenuController
  ) {
    this.IMAGES_BASE_URL = httpService.IMAGES_BASE_URL
     this.cart_items = addCartService.getCartItems()
    this.user_details = storageService.user_details
    let address = this.addCartService.getDeliveryAddress()
  
    if(address != null && address != ""){

      this.delivery_address = address['address'] + ' ' + address['pin_code']
     
    
    }
   
     this.totalAmount()
   
  }

  ngOnInit() {

  this.addCartService.updateCartListEmitter.subscribe( data =>{
    let address = this.addCartService.getDeliveryAddress()
  
    if(address != null && address != ""){

      this.delivery_address = address['address'] + ' ' + address['pin_code']
     
    
    }
    this.cart_items = data
    
    this.totalAmount()
  })
    this.getNextDate()
  }

  toggleDateDropDown=() =>{
    this.showDateDropdown= !this.showDateDropdown
  }

  toggleTimeDropDown=() =>{
    this.showTimeDropdown= !this.showTimeDropdown
  }
  getNextDate = () => {
    const date = new Date()
    let current_date = date.getDate()
    const current_month = date.getMonth()
    const current_year = date.getFullYear();
    for (let i = 0; i < 5; i++) {
      var temp_date = new Date(current_year, current_month, current_date + i)
      this.delivery_dates.push(temp_date)
    }
   
  }

  setDeliveryDate=(date)=>{
    this.selected_delivery_date = date
  }

  setDeliveryTime=(time)=>{
    this.selected_delivery_time = time
  }
  increaseQuanity = (cart_index) => {
    this.cart_items[cart_index]['quanity_value'] = this.cart_items[cart_index]['quanity_value'] + 0.5
    this.cart_items[cart_index]['product_quantity'] =this.cart_items[cart_index]['quanity_value']
    this.totalAmount()
    this.addCartService.setCartItems(this.cart_items)

  }

  desceaseQuantity = (cart_index) => {
    if (this.cart_items[cart_index]['quanity_value'] > 0.5) {
      this.cart_items[cart_index]['quanity_value'] = this.cart_items[cart_index]['quanity_value'] - 0.5
      this.cart_items[cart_index]['product_quantity'] =this.cart_items[cart_index]['quanity_value']
      this.totalAmount()
      this.addCartService.setCartItems(this.cart_items)
    }
  }

  totalAmount = () => {
    let temp_amount = 0
    this.cart_items.forEach(data => {
      temp_amount = temp_amount + (data.quanity_value * data.product_price)
    })
    this.total_amount = temp_amount
  }

  toggleMenu = () =>{
    this.menu.toggle()
  }

  removeItemFromCart = (cart_index) => {
    this.cart_items.splice(cart_index, 1)
    this.totalAmount()
    this.addCartService.setCartItems(this.cart_items)
  }

  goToPlaceOrder = () =>{
    const params ={
      delivery_time:this.selected_delivery_time,
      delivery_date:this.selected_delivery_date,
      items: JSON.stringify (this.addCartService.getCartItems())
    }
    let navigationExtras: NavigationExtras = {
      queryParams: params,
      skipLocationChange: true
    }
    this.router.navigate(['/place-order'], navigationExtras)
  }

  // placeOrder = () => {
  //   const params = {
  //     "user_id": this.user_details['user_id'],
  //     "total_amount": this.total_amount,
  //     "cart_items": this.cart_items
  //   }

  //   this.storageService.presentLoading()
  
  //   this.httpService.postRequest('orders', params).subscribe(data => {
  //     console.log(data)
  //     if (data['success']) {
  //       this.storageService.presentToast('Order Placed')
  //       this.addCartService.setCartItems([])
  //       this.cart_items = []
  //       this.total_amount = 0
  //     }
  //     this.storageService.dismissLoading()
  //   }, err => {
     
  //     this.storageService.dismissLoading()

  //   })

  // }

}
