import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // BASE_URL = 'https://ecommercetrinotech.herokuapp.com/'
  BASE_URL ='https://ecommerce.freshfromvypin.com/'
  IMAGES_BASE_URL = 'https://ecommerce.freshfromvypin.com/images/products/'
  // IMAGES_BASE_URL = 'http://ecommercetrinotech.herokuapp.com/images/products/'

  constructor(private http: HttpClient,
    private storageService: StorageService
    ) { }

    getDummy = async (url) =>{
      return await this.http.get('../../../assets/dummy_data/product_list.json').toPromise()
    }

  

  getRequest = async (url) => {
    let header = new HttpHeaders({
      // 'Authorization': 'Bearer zURoFs5lDGb2UYSvUM9ZYN8vBj9hCjmrEWLpfLwuLglMkqRHmlcz0c7cQG0b',
      'Authorization':'Bearer ' + this.storageService.user_details['api_token'] ,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    let options = {
      headers: header
    }
    console.log(options)
    console.log(this.BASE_URL + url)
   return await this.http.get( this.BASE_URL + url, options).toPromise()
  }

  deleteRequest = async (url) => {
    let header = new HttpHeaders({
      // 'Authorization': 'Bearer zURoFs5lDGb2UYSvUM9ZYN8vBj9hCjmrEWLpfLwuLglMkqRHmlcz0c7cQG0b',
      'Authorization':'Bearer ' + this.storageService.user_details['api_token'] ,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    let options = {
      headers: header
    }
    console.log(options)
    console.log(this.BASE_URL + url)
   return await this.http.delete( this.BASE_URL + url, options).toPromise()
  }

  postRequest = (url, param) => {
    console.log(JSON.stringify(param))
    console.log(param)
    let header = new HttpHeaders({
      // 'Authorization': 'Bearer zURoFs5lDGb2UYSvUM9ZYN8vBj9hCjmrEWLpfLwuLglMkqRHmlcz0c7cQG0b',
      'Authorization':'Bearer ' + this.storageService.user_details['api_token'] ,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    let options = {
      headers: header
    }

    return this.http.post(this.BASE_URL + url , param,options)
  }

  registerUser = ( url  , param) =>{
   return this.http.post(this.BASE_URL + url,param)
  }

  loginUser = (url , param) => {
   return this.http.post(this.BASE_URL + url , param )
  }
}
