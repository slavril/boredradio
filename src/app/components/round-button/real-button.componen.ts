import { Component, OnInit, Input } from '@angular/core';
import { RoundButtonComponent } from './round-button.component'

@Component({
  selector: 'app-real-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./real-button.component.scss']
})

export class RealButton extends RoundButtonComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}