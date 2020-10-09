import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddCartService } from '../../services/add-cart/add-cart.service'
import { StorageService } from '../../services/storage/storage.service'
import { HttpService } from '../../services/http/http.service'
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
@ViewChild('invoice',{static: true}) invoice: ElementRef
order_details = null
show_invoice= false


base="data:image/png;base64,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"
 orders = [{"product_id":3,"product_name":"Fendi Waxed Blue Jacket","product_price":80,"product_image":"51c1b-pmo000a.jpg","quanity_value":1},{"product_id":3,"product_name":"Fendi Waxed Blue Jacket","product_price":80,"product_image":"51c1b-pmo000a.jpg","quanity_value":1},{"product_id":3,"product_name":"Fendi Waxed Blue Jacket","product_price":80,"product_image":"51c1b-pmo000a.jpg","quanity_value":1}]
 delivery_dates = []
 delivery_time = ['8am - 10am','10am - 12pm', '2pm - 4pm','4pm - 6pm']
  today_date= new Date()
  showDateDropdown = false
  showTimeDropdown = false
  cart_items =[]
  amount = 0
  total_amount =0
  user_details= null
  address = ""
  delivery_address=""
  delivery_charges=0
  selected_delivery_date = new Date()
  selected_delivery_time = '10 AM'
  constructor(
    private addCartService: AddCartService,
    private httpService: HttpService,
    activateRoute:ActivatedRoute,
    private storageService: StorageService,
    private pdfGenerator:PDFGenerator,
    public alertController: AlertController,
    private router: Router,
  ) { 

    this.user_details = storageService.user_details
        activateRoute.queryParams.subscribe(param => {
      this.selected_delivery_date = param['delivery_date']
      this.selected_delivery_time = param['delivery_time']
      this.cart_items = JSON.parse (param['items'])
    })
    this.getNextDate()
     
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter')
    this.address= this.addCartService.getDeliveryAddress()
     console.log(this.address)
     if(this.address != null && this.address != ""){

       this.delivery_address = this.address['address'] + ' ' + this.address['pin_code']
      
       this.getDeliveryCharges(this.address['pin_code'])
      
     }
    
  }

  ngOnInit() { 
  }

  getDeliveryCharges =(postal_code) =>{
    this.storageService.presentLoading()
    this.httpService.getRequest(`postals/${postal_code}`).then( data =>{
   if(data['success']){
    if(data['data'].length != 0){
    this.delivery_charges =  parseInt(data['data'][0]['deliver_cost'])
    } else {
      this.delivery_charges = 0
    }
    this.totalAmount()
   }
      this.storageService.dismissLoading()
    },err =>{
      this.totalAmount()
      this.storageService.dismissLoading()
    })
  }

  toggleDateDropDown=() =>{
    this.showDateDropdown= !this.showDateDropdown
  }

  toggleTimeDropDown=() =>{
    this.showTimeDropdown= !this.showTimeDropdown
  }
  getNextDate = () => {
    const date = new Date()
    let current_date = date.getDate()
    const current_month = date.getMonth()
    const current_year = date.getFullYear();
    for (let i = 0; i < 5; i++) {
      var temp_date = new Date(current_year, current_month, current_date + i)
      this.delivery_dates.push(temp_date)
    }
   
  }

  setDeliveryDate=(date)=>{
    this.selected_delivery_date = date
  }

  setDeliveryTime=(time)=>{
    this.selected_delivery_time = time
  }

  totalAmount = () => {
    let temp_amount = 0
    this.cart_items.forEach(data => {
      temp_amount = temp_amount + (data.quanity_value * data.product_price)
    })
    this.amount = temp_amount
    this.total_amount = this.amount +  parseFloat((this.amount * 0).toFixed(2)) + this.delivery_charges
  }


  placeOrder = () => {
    if(this.cart_items.length !=0) {
      if(this.delivery_address.trim() != ""){

      
    
    const params = {
      "user_id": this.user_details['user_id'],
      "total_amount": this.total_amount,
      "cart_items": this.cart_items,
      "delivery_time":this.selected_delivery_time,
      "delivery_date":this.selected_delivery_date,
      "delivery_address":this.delivery_address
    }

    JSON.stringify(params)

    this.storageService.presentLoading()
  
    this.httpService.postRequest('api/orders', params).subscribe(data => {
      console.log(data)
      this.storageService.dismissLoading()
      if (data['success']) {
        this.order_details = data['data']
        console.log(this.order_details)
        this.storageService.presentToast('Order Placed')
      } else{
        this.storageService.logOut()
      }
      
    }, err => {
      console.log(err)
      this.storageService.dismissLoading()
      this.storageService.logOut()
    })
  }else{
    this.alertToAddAdress()
    // this.storageService.presentToast('Please select  delivery address')
  }
  }else{
    this.storageService.presentToast('Cart is empty')
  }
  }

  showInvoice = () =>{
    this.show_invoice = true
  }

  hideInvoice =() =>{
    this.show_invoice = false
  }

  
    async alertToAddAdress() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: 'Please add delivery address',
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.router.navigate(['/address'])
            }
          }
        ]
      });
  
      await alert.present();
    }
  

  generateInvoice = () =>{
    console.log('--gnertate--')
    let timestamp = Date.now()

    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: timestamp+'_freshfromvypin.pdf',
    }
    console.log(this.invoice.nativeElement.outerHTML)
      this.pdfGenerator.fromData(this.invoice.nativeElement.outerHTML,options).then( data =>{
        console.log(data)
    })
  }

}
