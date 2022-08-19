/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonButton, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonModal, { static: false }) modal: IonModal;
  @ViewChildren(IonButton, { read: ElementRef }) buttons: QueryList<ElementRef>;

  selectedButton: HTMLElement;

  constructor(private animationCtrl: AnimationController) {}

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const first = this.selectedButton.getBoundingClientRect();
    const last = document.querySelector('ion-app').getBoundingClientRect();

    // Invert
    const invert = {
      x: first.left - last.left,
      y: first.top - last.top,
      scaleX: first.width / last.width,
      scaleY: first.height / last.height,
    };

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .beforeStyles({
        ["transform-origin"]: "0 0",
        ["opacity"]: "1"
      })
      .fromTo(
        "transform",
        `translate(${invert.x}px, ${invert.y}px) scale(${invert.scaleX}, ${invert.scaleY})`,
        "translate(0, 0) scale(1, 1)"
      );
      //.fromTo("opacity", "0.4", "1");


    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(400)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  open(index: number): void {
    const button = this.buttons.get(index).nativeElement;

    this.selectedButton = button;

    this.modal.present();
  }

}
