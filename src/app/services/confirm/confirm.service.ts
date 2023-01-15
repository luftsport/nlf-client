import { Component, Injectable, Directive, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from 'app/pipes/safe.pipe';
/**
 * Options passed when opening a confirmation modal
 */
interface ConfirmOptions {
    /**
     * The title of the confirmation modal
     */
    title: string;

    /**
     * The message in the confirmation modal
     */
    message: string;

    yes?: string;
    no?: string;
    yes_color?: string;
    no_color?: string;
}

/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable()
export class ConfirmState {
    /**
     * The last options passed ConfirmService.confirm()
     */
    options: ConfirmOptions;

    /**
     * The last opened confirmation modal
     */
    modal: NgbModalRef;

    /**
     * The template containing the confirmation modal component
     */
    template: TemplateRef<any>;
}

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal, private state: ConfirmState) { }

    /**
     * Opens a confirmation modal
     * @param options the options for the modal (title and message)
     * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
     * the user chooses not to confirm, or closes the modal
     */
    confirm(options: ConfirmOptions): Promise<any> {
        this.state.options = options;

        if (!this.state.options.no_color) {
            this.state.options.no_color = 'secondary';
        }
        if (!this.state.options.yes_color) {
            this.state.options.yes_color = 'danger';
        }

        if (!this.state.options.no) {
            this.state.options.no = 'No';
        }
        if (!this.state.options.yes) {
            this.state.options.yes = 'Yes';
        }
        this.state.modal = this.modalService.open(ConfirmModalComponent);
        return this.state.modal.result;
    }
}

/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
    selector: 'confirm-modal-component',
    template: `<div class="modal-header">
    <h4 class="modal-title pull-left">{{ options.title }}</h4>
    <button type="button" class="close" aria-label="Close" (click)="no()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p [innerHTML]="options.message | safe"></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-{{ options.yes_color }}" (click)="yes()">{{ options.yes }}</button>
    <button type="button" class="btn btn-{{ options.no_color }}" (click)="no()">{{ options.no }}</button>
  </div>`
})
export class ConfirmModalComponent {

    options: ConfirmOptions;

    constructor(private state: ConfirmState) {
        this.options = state.options;
    }

    yes() {
        this.state.modal.close('confirmed');
    }

    no() {
        this.state.modal.dismiss('not confirmed');
    }
}

/**
 * Directive allowing to get a reference to the template containing the confirmation modal component,
 * and to store it into the internal confirm state service. Somewhere in the view, there must be
 *
 * ```
 * <template confirm>
 *   <confirm-modal-component></confirm-modal-component>
 * </template>
 * ```
 *
 * in order to register the confirm template to the internal confirm state
 */
@Directive({
    selector: 'template[confirm]'
})
export class ConfirmTemplateDirective {
    constructor(confirmTemplate: TemplateRef<any>, state: ConfirmState) {
        state.template = confirmTemplate;
    }
}

/** Example
@Component({
  selector: 'some-applicative-component',
  templateUrl: './some-applicative-component.html'
})
export class SomeApplicativeComponent {
  constructor(private confirmService: ConfirmService) {}

  deleteFoo() {
    this.confirmService.confirm({ title:'Confirm deletion', message: 'Do you really want to delete this foo?' }).then(
      () => {
        console.log('deleting...');
      },
      () => {
        console.log('not deleting...');
      });
  }
}

**/
