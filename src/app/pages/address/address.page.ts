import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../services/http/http.service'
import { StorageService } from '../../services/storage/storage.service'
import { AddCartService } from '../../services/add-cart/add-cart.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  addresses = []
  title = "test"
  address = "tttt"
  action = "add"

  constructor(private alertController: AlertController,
    private httpService: HttpService,
    private addCartService: AddCartService,
    private storageService: StorageService) {
    this.addresses = storageService.user_address
  }

  ngOnInit() {
  }


  addNewAddress() {
    const address = {
      title: "",
      address: ""
    }
    this.presentAlertPrompt("add", address)
  }

  async presentAlertPrompt(action, address) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Address',
      inputs: [
        {
          name: 'title',
          id: 'title',
          type: 'text',
          value: address.title,
          placeholder: 'Title'
        },
        {
          name: 'address',
          id: 'address',
          type: 'textarea',
          value: address.address,
          placeholder: 'Enter Address'
        },
        {
          name: 'pincode',
          id: 'pincode',
          type: 'number',
          value: address.pin_code,
          placeholder: 'Enter Pincode'
        }


      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Add',
          handler: (data) => {
            if (data.address.trim() != "" && data.pincode.trim() != "" && data.title.trim() != "") {
              if (action == "add") {
                this.addAddress(data)
              } else if (action == "edit") {
                this.editAdress(data, address.id)
              }
            } else {
              this.storageService.presentToast("All Fields Are Mendatory")
            }
           
          }
        }
      ]
    });

    await alert.present();
  }



  addAddress = (data) => {
    this.storageService.presentLoading()
    const param = {
      user_id: this.storageService.user_details['user_id'],
      address: data.address,
      title: data.title,
      pin_code:data.pincode
    }
    this.httpService.postRequest('api/updateSecondAddress', param).subscribe(data => {
      if (data['status']) {
        this.addresses.push(data['address'])
        if(this.addresses.length == 1){
        this.setDefault(this.addresses[0])
        }
      }
      this.storageService.dismissLoading()
    }, error => {
      this.storageService.dismissLoading()
    })
  }

  edit = (data, event: Event) => {
    event.stopPropagation()
    this.presentAlertPrompt("edit", data)
  }


  editAdress = (data, id) => {
    this.storageService.presentLoading()
    const param = {
      user_id: this.storageService.user_details['user_id'],
      id: id,
      title: data.title,
      address: data.address,
      pin_code:data.pincode
    }

    this.httpService.postRequest('api/updateSecondAddress', param).subscribe(data => {

      if (data['status']) {
        const index = this.addresses.findIndex(address => address.id == data['address']['id'])
   
        this.addresses[index] = data['address']
      }
      this.storageService.dismissLoading()
    }, error => {
     
      this.storageService.dismissLoading()
    })
  }


  deleteAddress = (id, event: Event, index) => {
    console.log(index)
    event.stopPropagation()
    this.storageService.presentLoading()
    this.httpService.deleteRequest('api/destroyAddress/' + id).then(data => {
     
      this.addresses.splice(index, 1)
      this.storageService.dismissLoading()
    }, error => {
     
      this.storageService.dismissLoading()
    })
  }

  setDefault = (address) => {
    this.storageService.presentLoading()
    const param = {
      'id': address.id,
      'user_id': this.storageService.user_details['user_id']
    }
    this.httpService.postRequest('api/currentAddress', param).subscribe(data => {
   
      if (data['status']) {
        this.addCartService.setDeliveryAddress(address)
        this.addCartService.updateCartList()
        this.storageService.presentToast(address.title + ' set as default')
      }
      this.storageService.dismissLoading()
    }, error => {
    
      this.storageService.dismissLoading()
    })
  }
}
