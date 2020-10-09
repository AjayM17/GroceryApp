import { Component, OnInit,Input } from '@angular/core';
import { AddCartService } from '../../services/add-cart/add-cart.service'
import { StorageService } from '../../services/storage/storage.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
 @Input() product_image:''
 @Input() product: {
  a_img: ""
  b_img: "01f42-pwt004b.jpg"
  brand_id: 7
  c_img: "3f214-pwt004t.jpg"
  cat_id: 11
  description: ""
  id: 0
  name: ""
  parent_id: 0
  price: "14"
  quantity: 0
  slug: ''
 }

  constructor(
    private addCartService: AddCartService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
   
  }

  addToCart = (event:Event) => {
    const param ={
      product_id : this.product['id'],
      product_name:this.product['name'],
      product_price:parseInt(this.product['price']),
      product_image:this.product['a_img'],
      quanity_value: 1,
      product_quantity:1
    }
     this.addCartService.addItemIntoCart(param)
     this.storageService.presentToast('Item Added')
     event.preventDefault()
     event.stopPropagation()
  }

}
