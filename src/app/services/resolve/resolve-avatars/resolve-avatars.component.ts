import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nlf-resolve-avatars',
  templateUrl: './resolve-avatars.component.html',
  styleUrls: ['./resolve-avatars.component.css']
})
export class NlfResolveAvatarsComponent implements OnInit {

  @Input() persons: number[];
  @Input() title: boolean = false;
  @Input() max: number = 5;
  @Input() show_remaining: boolean = true;
  @Input() steps: number = 5;

  constructor() { }

  ngOnInit() {

  }

  public nextStep() {
    this.max = +this.max + +this.steps;
    }

}
