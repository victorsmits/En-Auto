import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProgressBarColor]'
})
export class ProgressBarColor implements OnChanges {
  static counter = 0;
  color: string;
  @Input() appProgressBarColor;
  styleEl: HTMLStyleElement = document.createElement('style');

//generate unique attribule which we will use to minimise the scope of our dynamic
  style
  uniqueAttr = `app-progress-bar-color-${ProgressBarColor.counter++}`;

  constructor(private el: ElementRef) {
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.setAttribute(this.uniqueAttr, '');
    nativeEl.appendChild(this.styleEl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateColor();
  }

  RainBowColor(length, maxLength) {
    var i = (length * 255 / maxLength);
    var r = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    var b = 0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }


  updateColor(): void {
    if (this.appProgressBarColor > 50) {
      this.appProgressBarColor = 'linear-gradient(to right, #a02c2c ,' + this.RainBowColor(this.appProgressBarColor, 100) + ' );'
    } else {
      this.appProgressBarColor = 'linear-gradient(to right, #a02c2c, red );'
    }
    console.log(this.appProgressBarColor)

// update dynamic style with the uniqueAttr
    this.styleEl.innerText = `
  [${this.uniqueAttr}] .mat-progress-bar-fill::after {
    background-image: ${this.appProgressBarColor};
  }
`;
    console.log(this.appProgressBarColor)
  }
}
