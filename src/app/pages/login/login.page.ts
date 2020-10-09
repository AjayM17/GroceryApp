import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service'
import { StorageService } from '../../services/storage/storage.service'
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AddCartService } from '../../services/add-cart/add-cart.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mobile_number : number = null
  password = null
  loginForm: FormGroup;
  formSubmitted = false
  invalidUser = false
  password_visible = false
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private navCtrl: NavController,
    private addCartService:AddCartService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobile_number:['', Validators.required],
      password:['', Validators.required],
    })
  }

  get getFormControls() {
    return this.loginForm.controls
   }

  loginUser = () => {
    this.formSubmitted = true
    if(this.loginForm.valid){
      this.storageService.presentLoading()
      const param = {
        'mobile_number': this.loginForm.get('mobile_number').value,
        'password': this.loginForm.get('password').value.trim(),
      }
      console.log(param)
      this.httpService.loginUser('api/login',param).subscribe( response => {
      
        if(response['status'] == 'sucess'){
          // this.storageService.user_details = response['data']
          this.storageService.user_status = 'login'
          this.storageService.setKey('user_status' , 'login')
          this.storageService.setKey('cart_data',[])
          this.addCartService.setCartItems([])
          const param = {
            'user_id':response['user_id'],
            'name':response['name'],
            'mobile_number':response['mobile_number'],
            'api_token':response['api_token'],
            'address':response['address'],
            'email':response['email']
          }
        
          this.storageService.user_details = param
           this.httpService.getRequest(`api/userInfo/${response['user_id']}`).then(data => {
         console.log(data)
                    if(data['status']){
                       this.storageService.user_address = data['multiple_address']
                       if(data['default_address'].length != 0 ){
                         this.addCartService.setDeliveryAddress(data['default_address'][0])
                       } else {
                        if(data['multiple_address'].length != 0){
                         this.addCartService.setDeliveryAddress(data['multiple_address'][0])
                       }
                      }
                       
                     }
                     
                     this.storageService.setKey('user_data', JSON.stringify(param)).then( res => {
                       this.storageService.dismissLoading()
                       this.router.navigate(['/tabs/home'])
                       
                     })
           },error =>{
    
           })
         
          
        }else{
          this.invalidUser = true
          this.storageService.dismissLoading()
        }
      },error => {
      
        this.storageService.dismissLoading()
      })
    }
  }

  togglePasswordVisibility = () =>{
    this.password_visible = !this.password_visible
  }

  goBack=() =>{
    this.navCtrl.pop()
  }

}
