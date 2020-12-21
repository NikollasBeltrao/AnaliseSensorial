import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewDidEnter, OnDestroy {
  backButtonSubscription;
  constructor(private route: Router, private platform: Platform, public active: ActivatedRoute) {

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
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(['login']);
  }

  goToAnalise() {
    this.backButtonSubscription.unsubscribe();
    this.route.navigate(['analise']);
  }
}
