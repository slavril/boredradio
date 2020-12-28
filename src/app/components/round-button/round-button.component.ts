import { Component, OnInit, Input } from '@angular/core';

export const b_type = {
  primary: 0,
  secondary: 1
}

@Component({
  selector: 'app-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.scss']
})

export class RoundButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.action()
  }

  @Input() title: string = null;
  @Input() action: VoidFunction;

  @Input() buttonType = b_type.primary
  @Input() icon = null

  get buttonStyle() {
    if (this.buttonType == b_type.primary) return 'button'
    return 'button button-secondary'
  }

  get titleStyle() {
    if (this.buttonType == b_type.primary) return 'title'
    return 'title title-secondary'
  }

}