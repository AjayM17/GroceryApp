import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service'


@Injectable({
  providedIn: 'root'
})
export class AddCartService {

  cart =[]
  delivery_addres=null

  updateCartListEmitter = new EventEmitter()
  updateCartCountsEmitter = new EventEmitter()

  constructor(private storageService: StorageService) { }

  addItemIntoCart = (item ) => {
    this.cart.push(item)
      this.updateCartCounts()
     this.updateCartStorage()
  }

  getCartCount  = () => {
    return this.cart.length
  }


  getCartItems = () => {
    return this.cart
  }

  setCartItems = (items) =>{
    this.cart = items
    this.updateCartCounts()
    this.updateCartStorage()
  }  

  updateCartStorage = () => {
    this.storageService.setKey('cart_data',this.cart)
  }

 
  setDeliveryAddress=(address)=>{
    this.delivery_addres=address
  }

  getDeliveryAddress=()=>{
    return this.delivery_addres
  }

  updateCartList =() =>{
    this.updateCartListEmitter.emit(this.cart)
  }

  updateCartCounts = () =>{
    this.updateCartCountsEmitter.emit(this.cart.length)
  }

}
