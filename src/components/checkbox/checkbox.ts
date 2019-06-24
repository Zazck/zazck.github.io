import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';
import { bindable } from 'aurelia-framework';
export class Checkbox {
  @bindable public checked: boolean;
  public checkBox: HTMLDivElement;
  public formField: HTMLDivElement;
  public mdcCheckBox: MDCCheckbox;
  public mdcFormField: MDCFormField;
  bind() {
    this.mdcCheckBox = MDCCheckbox.attachTo(this.checkBox);
    this.mdcFormField = MDCFormField.attachTo(this.formField);
  }
  attached() {
    setTimeout(() => this.mdcCheckBox.ripple.layout(), 0);
  }
  unbind() {
    this.mdcCheckBox.destroy();
    this.mdcFormField.destroy();
  }
}
