import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service'
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service'
import { isNullOrUndefined } from 'util';
import { AddCartService } from '../../services/add-cart/add-cart.service'

@Component({
  selector: 'app-more-products',
  templateUrl: './more-products.page.html',
  styleUrls: ['./more-products.page.scss'],
})
export class MoreProductsPage implements OnInit {

  products:[]
  IMAGES_BASE_URL = null
  category_id = "all"
  see_more_porduct_type=""
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private addCartService: AddCartService,
    private storageService: StorageService,
  ) { 
    this.IMAGES_BASE_URL = httpService.IMAGES_BASE_URL
  this.category_id =  route.snapshot.paramMap.get('cat_id')
  this.see_more_porduct_type = route.snapshot.paramMap.get('type')
 
  if(this.see_more_porduct_type == "category"){
    this.getData(this.category_id)
  } else if(this.see_more_porduct_type == "search"){
    this.searchResult(this.category_id)
  }
    
  }

  ngOnInit() {
  }

  getData = async(cat_id) => {

    this.storageService.presentLoading()
    if(cat_id == 'all') {
      await this.httpService.getRequest('products').then(response =>{
        if(!isNullOrUndefined(response) && response['success']){
          this.products = response['data']
      
        }
      })
    } else {
      await this.httpService.getRequest(`categoryProduct/${cat_id}`).then(response => {
        console.log(response)
        if (!isNullOrUndefined(response) && response['success']) {
          this.products = response['data']
          
        }
      })

    }
      
      this.storageService.dismissLoading()
    }


    searchResult =async (search_key) =>{
      // getCategoryData = async (category) => {
        await this.storageService.presentLoading()
      
          await this.httpService.getRequest(`api/searchProduct/${search_key}`).then(response => {
            if (!isNullOrUndefined(response) && response['success']) {
              this.products = response['data']
              
            }
          })
         
    
        
        await this.storageService.dismissLoading()
      // }
    }
    
    productDetails = (product) => {
      this.storageService.presentProductDetails(product, this.IMAGES_BASE_URL, this.storageService, this.addCartService)
    }

}
