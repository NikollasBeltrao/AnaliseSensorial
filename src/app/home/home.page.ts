import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ViewDidEnter } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter, OnDestroy {
  backButtonSubscription;
  options: NativeTransitionOptions;
  constructor(private route: Router, private platform: Platform, public active: ActivatedRoute,
    private nativePageTransitions: NativePageTransitions) {
    this.options = {
      direction: 'left',
      duration: 400,    
    }


  }
  ngOnInit() {
  }

  ionViewDidEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  goToLogin() {
    this.nativePageTransitions.slide(this.options)
      .catch(console.error);
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(['login']);
  }

  goToAnalise() {
    this.nativePageTransitions.slide(this.options)
      .catch(console.error);
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(['analise']);
  }
  goToNovoUsuario(){
    this.nativePageTransitions.slide(this.options)
      .catch(console.error);
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(["criar-usuario", { id_user: 0 , tipo_user: 1}]);
  }
}
