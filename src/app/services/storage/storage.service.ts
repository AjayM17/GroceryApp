import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ToastController,NavController,LoadingController,ModalController } from '@ionic/angular';
import { ProductDetailsPage } from '../../pages/product-details/product-details.page'
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user_details = {
    api_token:''
  };
  user_status = 'logout'
  user_address =[]
  loader : HTMLIonLoadingElement  = null


  constructor(private storage: Storage,
    private navController: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
    ) {
   }

   setKey = (key, value) =>{
    return this.storage.set(key, value)
   }

   getKey = async (key) =>{
    return await this.storage.get(key)
   }

  
   async presentProductDetails(details,image_base_url,storageService,addCartService) {
    const modal = await this.modalController.create({
      component: ProductDetailsPage,
      componentProps:{
        product_details:details,
        IMAGES_BASE_URL:image_base_url,
        addCartService:addCartService,
        storageService:storageService
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

   async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
 this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: "please wait",
    });
    await this.loader.present();
    // this.loader.dismiss()

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async dismissLoading() {
    await this.loader.dismiss()
  }

  clearAllStorage = () => {
   return this.storage.clear()
  }



  logOut = () => {
    this.clearAllStorage().then( data => {
      this.user_details = null
      this.navController.navigateRoot('/initial-page')
    })
  }
}
