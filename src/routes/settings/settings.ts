import { Config } from 'services/config';
import { observable } from 'aurelia-binding';
export class Settings {
  @observable
  public autoRedirect: boolean = Config.autoRedirect ? true : false;

  public autoRedirectChanged(v) {
    Config.autoRedirect = v;
  }
}
