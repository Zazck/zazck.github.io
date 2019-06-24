import { DMM, OpCode } from './../../services/dmm';
import { Config } from 'services/config';
import { Router } from 'aurelia-router';

export class Auth {
  public loginID = Config.loginID || '';
  public password = Config.password || '';
  public saveLoginID: boolean = Config.loginID ? true : false;
  public savePassword: boolean = Config.password ? true : false;
  public autoLogin: boolean = Config.autoLogin;
  public category: 0 | 1 = Config.category === 'exchange' ? 1 : 0;
  public static inject = [DMM, Router];
  public requesting: boolean = false;
  public constructor(
    public dmm: DMM,
    public router: Router,
  ) {}
  public async login() {
    this.requesting = true;
    const result = await this.dmm.login(
      {
        login_id: this.loginID,
        password: this.password,
        use_auto_login: this.autoLogin ? 1 : 0,
        save_login_id: this.saveLoginID ? 1 : 0,
        save_password: this.savePassword ? 1 : 0,
      },
      this.category === 1,
    );
    this.requesting = false;
    if (result.code === OpCode.OK) {
      this.router.navigate('game-list/');
    }
  }
}
