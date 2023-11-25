import { Component, ElementRef, ViewChild } from '@angular/core';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.scss']
})
export class ReseniaComponent {
  @ViewChild('swiperElem', { static: false }) swiperElem?: ElementRef;

  animationInProgress = false;
  config = {
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: true,
    loop: true,
  }
  constructor() { }

  ngAfterViewInit() {





  }
  ngOnInit(): void {
    //
    this.startAnimation();

  }
  startAnimation() {
    if(this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.swiperElem?.nativeElement.swiper.slidePrev(2000);
      this.animationInProgress = false;
      this.startAnimation();
    }, 5000);
  }



  onNext(){
    const swiper = this.swiperElem?.nativeElement.swiper;
    swiper.slideNext();
  }

  onPrev(){
    const swiper = this.swiperElem?.nativeElement.swiper;
    swiper.slidePrev();
  }

}
