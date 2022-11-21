import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-first-modal',
  templateUrl: './first-modal.page.html',
  styleUrls: ['./first-modal.page.scss'],
})
export class FirstModalPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.modalCtrl.dismiss();
  }

}
