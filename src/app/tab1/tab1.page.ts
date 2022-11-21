import { Component, OnInit } from '@angular/core';

import { Device } from '@capacitor/device';

import { Config } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  device: any = {};

  constructor(private config: Config) {}

  ngOnInit() {
    // const id = await Device.getId();
    // const info = await Device.getInfo();

    // this.device = {
    //   uuid: id.uuid,
    //   name: info.name,
    // };

    const mode = this.config.get('mode');

    console.log({ mode });
  }

}
