import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service'
import { StorageService } from '../../services/storage/storage.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
   styleUrls: ['./edit-profile.page.scss'],
  // styleUrls: ['../login/login.page.scss'],
})
export class EditProfilePage implements OnInit {
  name = null
  mobile_number : number = null
  email = null
  address = null
  EMAIL_REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  profileUpdateForm: FormGroup;
  formSubmitted = false
  invalidUser = false
  user_details = null
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private storageService: StorageService,
    // private router: Router,
    // private addCartService:AddCartService
    ) {
    
      this.user_details = storageService.user_details
     }

    ngOnInit() {
      this.profileUpdateForm = this.formBuilder.group({
        name:[this.user_details.name, Validators.required],
      email:[this.user_details.email, [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
        mobile_number:[this.user_details.mobile_number, Validators.required],
        address:[this.user_details.address, Validators.required],
      })
    }
  
    get getFormControls() {
      return this.profileUpdateForm.controls
     }

     updateProfile = () => {
      this.formSubmitted = true
      if(this.profileUpdateForm.valid){
        this.storageService.presentLoading()
        const param = {
          'user_id':this.user_details['user_id'],
          'name':this.profileUpdateForm.get('name').value,
          'email':this.profileUpdateForm.get('email').value,
          'mobile_number':this.profileUpdateForm.get('mobile_number').value,
          'address':this.profileUpdateForm.get('address').value,
          // 'mobile_number': this.loginForm.get('mobile_number').value,
          // 'password': this.loginForm.get('password').value.trim(),
        }
        this.httpService.postRequest('api/updateProfile',param).subscribe( response => {
        
          if(response['status'] == 'sucess'){
            const param = {
              'user_id':this.user_details['user_id'],
              'name':this.profileUpdateForm.get('name').value,
              'mobile_number':this.profileUpdateForm.get('mobile_number').value,
              'api_token':this.user_details['api_token'],
              'address':this.profileUpdateForm.get('address').value,
              'email':this.profileUpdateForm.get('email').value
            }
          
            this.storageService.user_details = param
            this.storageService.setKey('user_data', JSON.stringify(param)).then( res => {
              this.storageService.dismissLoading()
              // this.router.navigate(['/tabs/home'])
            })
            this.storageService.presentToast("Profile Updated")
            // this.storageService.user_details = response['data']
            // this.storageService.user_status = 'login'
            // this.storageService.setKey('user_status' , 'login')
            // this.storageService.setKey('cart_data',[])
            // this.addCartService.setCartItems([])
            // const param = {
            //   'name':response['name'],
            //   'mobile_number':response['mobile_number'],
            //   'api_token':response['api_token']
            // }
            // console.log(param)
            // this.storageService.user_details = param
            // this.storageService.setKey('user_data', JSON.stringify(param)).then( res => {
              // this.storageService.dismissLoading()
              // this.router.navigate(['/tabs/home'])
            // })
            
          }else{
            // this.invalidUser = true
            this.storageService.dismissLoading()
          }
        },error => {
        
          this.storageService.dismissLoading()
        })
      }
    }
  

}
