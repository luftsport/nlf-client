import { Component, OnInit, TemplateRef } from '@angular/core';
import { NlfToastService } from 'app/services/toast/toast.service';
@Component({
  selector: 'nlf-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: { class: 'toast-container position-fixed top-5 end-0 p-3', style: 'z-index: 1200' },
})
export class NlfToastComponent implements OnInit {

  constructor(public toastService: NlfToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
