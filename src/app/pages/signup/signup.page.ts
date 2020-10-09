import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http/http.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { MustMatch } from '../../components/custom-validations/custom-validations'
import { StorageService } from '../../services/storage/storage.service'
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],

})
export class SignupPage implements OnInit {

  @ViewChild('otp1') otp1: IonInput
  @ViewChild('otp2') otp2: IonInput
  @ViewChild('otp3') otp3: IonInput
  @ViewChild('otp4') otp4: IonInput

  name = ''
  password_visible = false
  re_password_visible = false
  email = null
  password = null
  signup_step = 1
  mobileInvalid = false
  otp_number = ""
  registerForm: FormGroup;
  EMAIL_REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  formSubmitted = false
  verify_otp_code = null


  constructor(private httpService: HttpService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private navCtrl: NavController,
  ) {
  }

  ngOnInit() {
    this.signup_step = 1
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      re_password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: MustMatch('password', 're_password')
    })
  }

  get getFormControls() {
    return this.registerForm.controls
  }



  verifyOTP = () =>{
    if(this.verify_otp_code == this.otp_number){
     this.registerUser()
    } else{
      if(this.otp_number.trim() == ""){
        this.storageService.presentToast("please enter OTP")
      }else{
        this.storageService.presentToast("OTP didn't Match")
      }
    }
  }

  generateOTP = () => {
    this.storageService.presentLoading()
    this.signup_step = 2
    this.httpService.getRequest(`sendOtp/${this.registerForm.get('mobile_number').value.trim()}`).then( data =>{
      console.log(data)
      if(data['success']){
        this.verify_otp_code = data['otp']
      }
      this.storageService.dismissLoading()
    },err =>{
      console.log(err)
      this.storageService.dismissLoading()
    })
  }

  registerUser = () => {
    if (this.registerForm.valid) {
      this.storageService.presentLoading()
      const param = {
        'name': this.registerForm.get('name').value.trim(),
        'email': this.registerForm.get('email').value.trim(),
        'mobile_number': this.registerForm.get('mobile_number').value.trim(),
        'password': this.registerForm.get('password').value.trim(),
      }
      console.log(param)
      this.httpService.registerUser('api/register', param).subscribe(response => {

        if (response['success']) {
          console.log(response)
          this.storageService.dismissLoading()
          this.router.navigate(['/login'])
          this.storageService.presentToast('User Registerd')
        } else {
          this.storageService.dismissLoading()
        }
      }, error => {
        console.log(error)
        this.storageService.presentToast('User Already Exists')
        this.storageService.dismissLoading()
      })

    }
  }


  submitForm = () => {
    this.formSubmitted = true
    if (this.registerForm.valid) {

      this.generateOTP()

    }
  }



  goBack = () => {
    this.navCtrl.pop()
  }


  togglePasswordVisibility = () => {
    this.password_visible = !this.password_visible
  }

  toggleRePasswordVisibility = () => {
    this.re_password_visible = !this.re_password_visible
  }
}
