import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service'
import { StorageService } from '../../services/storage/storage.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  IMAGES_BASE_URL = null
  user_details = null
  orders = null

  constructor( private httpService: HttpService,
    private storageService:StorageService) { 
      this.IMAGES_BASE_URL = httpService.IMAGES_BASE_URL
      this.user_details = storageService.user_details
      
    }

  ngOnInit() {
    this.getMyOrders(this.user_details['user_id'])
  }

  getMyOrders = async (user_id) =>{
    this.storageService.presentLoading()
    await this.httpService.getRequest(`api/orders/${user_id}`).then( data => {
   
      if(data['success']){

        this.orders=data['data']
     
      }
      this.storageService.dismissLoading()
    }, err => {
      this.storageService.logOut()
       this.storageService.dismissLoading()

    })
 
  }

}
