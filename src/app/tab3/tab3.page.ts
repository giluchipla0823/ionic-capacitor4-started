/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, IonButton, IonCard, IonModal, ModalController, Animation } from '@ionic/angular';
import { FirstModalPage } from '../first-modal/first-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonModal, { static: false }) modal: IonModal;
  @ViewChildren(IonCard, { read: ElementRef }) cards: QueryList<ElementRef>;

  selectedButton: HTMLElement;

  cardAnimation: Animation;

  constructor(
    private animationCtrl: AnimationController,
    private modalCtrl: ModalController
  ) {}

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const first = this.selectedButton.getBoundingClientRect();
    const last = document.querySelector('body').getBoundingClientRect();

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

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('cubic-bezier(0.3,0,0.66,1)')
      .duration(400)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse').duration(0);
  };

  async open(index: number) {
    const button = this.cards.get(index).nativeElement;

    this.selectedButton = button;

    this.settingCardAnimation();

    await this.modal.present();

    // await this.cardAnimation.play();

    await this.modal.onDidDismiss();

    await this.cardAnimation.direction('reverse').play();

    this.selectedButton.style.removeProperty('z-index');
  }

  async open2(index: number) {
    const button = this.cards.get(index).nativeElement;

    this.selectedButton = button;

    const modal = await this.modalCtrl.create({
      component: FirstModalPage,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('Confirm modal');
    }
  }

  async settingCardAnimation() {
    this.selectedButton.style.zIndex = '10';

    this.cardAnimation = this.animationCtrl
      .create()
      .addElement(this.selectedButton)
      .fromTo('transform', 'scale(1, 1)', `scale(10, 10)`)
      // .easing('cubic-bezier(0.3,0,0.66,1)')
      .easing('ease-in')
      .duration(300);

    // setTimeout(async () => {
      // await cardAnimation.direction('reverse').play();
      // this.selectedButton.style.removeProperty('z-index');
    // }, 2000);
  }

}
