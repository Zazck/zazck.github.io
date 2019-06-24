import { MDCTabBar } from '@material/tab-bar';
import { bindable } from 'aurelia-framework';
export class TabBar {
  @bindable public index: number = 0;
  public el: HTMLElement;
  private manual: boolean = false;

  tabBarActivated = (e: CustomEvent) => {
    this.index = e.detail.index;
  }

  attached() {
    // use setTimeout to delay the listener binding
    setTimeout(
      () => {
        (<MDCTabBar>(<any>this.el).MDCTabBar).listen('MDCTabBar:activated', this.tabBarActivated);
        (<MDCTabBar>(<any>this.el).MDCTabBar).activateTab(this.index);
      },
      0,
    );
  }

  detached() {
    (<MDCTabBar>(<any>this.el).MDCTabBar).unlisten('MDCTabBar:activated', this.tabBarActivated);
    (<MDCTabBar>(<any>this.el).MDCTabBar).destroy();
  }
}
