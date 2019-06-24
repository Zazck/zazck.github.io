import { MDCSwitch } from '@material/switch';
import { MDCFormField } from '@material/form-field';
import { bindable } from 'aurelia-framework';
export class Switch {
  @bindable public checked: boolean;
  public switchBox: HTMLDivElement;
  public formField: HTMLDivElement;
  public mdcMDCSwitch: MDCSwitch;
  public mdcFormField: MDCFormField;
  bind() {
    this.mdcMDCSwitch = MDCSwitch.attachTo(this.switchBox);
    this.mdcFormField = MDCFormField.attachTo(this.formField);
  }
  attached() {
    setTimeout(() => this.mdcMDCSwitch.ripple.layout(), 0);
  }
  unbind() {
    this.mdcMDCSwitch.destroy();
    this.mdcFormField.destroy();
  }
}
