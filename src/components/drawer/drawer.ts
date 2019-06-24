import { MDCDrawer } from '@material/drawer';

export class Drawer {
  public el: HTMLElement;

  unbind() {
    (<any>this.el).MDCDrawer.destroy();
  }

  public open() {
    (<any>this.el).MDCDrawer.open = true;
  }

  public close() {
    if ((<any>this.el).MDCDrawer) {
      (<any>this.el).MDCDrawer.open = false;
    }
  }
}
