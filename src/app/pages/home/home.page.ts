import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http/http.service'
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service'
import { AddCartService } from '../../services/add-cart/add-cart.service'
import { isNullOrUndefined } from 'util';
import { MenuController } from '@ionic/angular';
// import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  products: []
  categories = []
  fresh_arrivals = []
  more_product_type="category"
  selected_category = 'all'
  cart_count = 0
  search_key=""
  IMAGES_BASE_URL = null
  today_date = new Date()

  constructor(private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
    private addCartService: AddCartService,
    private menu: MenuController
  ) {
    this.IMAGES_BASE_URL = httpService.IMAGES_BASE_URL
  }

  ngOnInit() {
   
     this.getData()
    
  }


  toggleMenu = () =>{
    this.menu.toggle()
  }
  searchInputChange = (event) => {
    const param = {
      'result_type': 'search',
      'search_key': event.target.value
    }



    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(param)
      },
      skipLocationChange: true
    }
    this.router.navigate(['/search-results'], navigationExtras)
  }



  getData = async () => {
   
    await this.storageService.presentLoading()
    await this.getAllProducts()
    await this.getCategories()
    await this.storageService.dismissLoading()
  }

  getAllProducts = async () => {
    await this.httpService.getRequest('products').then(response => {
   
      if (!isNullOrUndefined(response) && response['success']) {
        this.products = response['data']
        this.getFreshArrivals()
      }
    })
  }


  getCategories = async () => {
    await this.httpService.getRequest('productCategories').then(response => {
      if (!isNullOrUndefined(response) && response['success']) {
        this.categories = response['data']
        const all = {
          cat: "All",
          cat_id: 'all',
          f_img: "",
          m_img: "",
          parent_id: 0
        }
        this.categories.unshift(all)
      }
    })
  }

  getFreshArrivals = () => {
    this.products.forEach(data => {
      if (this.isProductIsFresh(data['fresh_product_date'])) {
        this.fresh_arrivals.push(data)
      }
    })
  }


  isProductIsFresh = (product_datetime) => {
    const product_date = product_datetime.split(' ')[0]
    const product_date_array = product_date.split('-')
    const current_day = this.today_date.getDate().toString()
    let current_month = ''
    if (this.today_date.getMonth() + 1 < 10) {
      current_month = "0" + (this.today_date.getMonth() + 1)
    } else {
      current_month = (this.today_date.getMonth() + 1).toString()
    }
    const current_year = this.today_date.getFullYear().toString()

    if (current_year == product_date_array[0] && current_month == product_date_array[1] && current_day == product_date_array[2]) {
      return true
    }
    return false
  }


  getCategoryData = async (category) => {
    this.more_product_type ="category"
    await this.storageService.presentLoading()
    this.selected_category = category['cat_id']
    if (category['cat_id'] == 'all') {
    await  this.getAllProducts()
    } else {
      await this.httpService.getRequest(`categoryProduct/${category['cat_id']}`).then(response => {
     
        if (!isNullOrUndefined(response) && response['success']) {
          this.products = response['data']
          this.getFreshArrivals()
        }
      })
     

    }
    await this.storageService.dismissLoading()
  }


  searchResult =async (event) =>{
    this.more_product_type="search"
   
    // getCategoryData = async (category) => {
      await this.storageService.presentLoading()
      this.selected_category = this.search_key
    
        await this.httpService.getRequest(`api/searchProduct/${this.search_key}`).then(response => {
        
          if (!isNullOrUndefined(response) && response['success']) {
            this.products = response['data']
            this.getFreshArrivals()
          }
        })
       
  
      
      await this.storageService.dismissLoading()
    // }
  }
  
  productDetails = (product) => {
    this.storageService.presentProductDetails(product, this.IMAGES_BASE_URL, this.storageService, this.addCartService)
  }

  ngOnDestroy() {
    
  }

}
