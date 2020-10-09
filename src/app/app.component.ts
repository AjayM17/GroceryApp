import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage/storage.service'
import { Router } from '@angular/router';
import { AddCartService } from './services/add-cart/add-cart.service'
import { HttpService } from './services/http/http.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private router: Router,
    private addCartService: AddCartService,
    private httpService: HttpService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
          this.authUser()
    });
  }

  authUser = async () =>{
  
    const user_status =  await this.storageService.getKey('user_status')

    const user_data =  await this.storageService.getKey('user_data')
    const cart_item = await this.storageService.getKey('cart_data')
    if(user_status == "login" && user_data != null){
    
      this.addCartService.setCartItems(cart_item)
    
      this.storageService.user_details = JSON.parse(user_data)
     await this.httpService.getRequest(`api/userInfo/${this.storageService.user_details['user_id']}`).then(data => {
    
               if(data['status']){
                  this.storageService.user_address = data['multiple_address']
                  if(data['default_address'].length != 0){
                    this.addCartService.setDeliveryAddress(data['default_address'][0])
                  } else {
                    if(data['multiple_address'].length != 0){

                      this.addCartService.setDeliveryAddress(data['multiple_address'][0])
                    }
                  }
                  
                }
      },error =>{

      })
      this.router.navigate(['/tabs/home']) 
    } else {
      this.router.navigate(['/initial-page'])
    }
  }

}
