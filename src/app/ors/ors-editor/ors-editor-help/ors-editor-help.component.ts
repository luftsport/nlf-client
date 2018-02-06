import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * This class should get help text from api
 * Then inject with sanitize in modal-body
 * In the modal body use the <nlf-article-get html=true category=help id=actions></..>
 */

@Component({
  selector: 'nlf-ors-editor-help',
  templateUrl: './ors-editor-help.component.html',
  styleUrls: ['./ors-editor-help.component.css']
})
export class NlfOrsEditorHelpComponent implements OnInit {

  @Input() template: string;

  modalRef;

  constructor(private modalService: NgbModal) { }

  // @TODO check if is in array of allowed help?
  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    console.log(template);
    this.modalRef = this.modalService.open(template, {size: 'lg'});
   }
}
