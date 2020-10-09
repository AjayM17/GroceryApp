import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service'
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user_details = null

  constructor(private storageService: StorageService, 
    private navController: NavController,
    private menu: MenuController
    ) { 
      this.user_details = storageService.user_details
    }

  ngOnInit() {
  }

  toggleMenu = () =>{
    this.menu.toggle()
  }

  logOut = () => {
    this.storageService.logOut()
    // this.storageService.clearAllStorage().then( data => {
    //   this.navController.navigateRoot('/login')
    // })
  }

}
