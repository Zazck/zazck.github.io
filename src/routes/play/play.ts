import { DMM, OpCode, IInstallPayload } from './../../services/dmm';
import { Router } from 'aurelia-router';
import { Config } from 'services/config';

interface IGameSearch {
  category: string;
  name: string;
}

export class Play {
  public osapi: string = '';
  public iframeWidth: number = 1200;
  public iframeHeight: number = 1200;
  public category: string = '';
  public name: string = '';
  public notification: boolean = true;
  public myapp: boolean = true;
  public loading: boolean = false;
  public confirm: boolean = false;
  public static inject = [DMM, Router];
  public constructor(
    public dmm: DMM,
    public router: Router,
  ) {}

  public handleOsapi(osapi: string) {
    const params = new URL(osapi);
    if (params.searchParams.has('parent')) {
      params.searchParams.set('parent', `${window.location.origin}${window.location.pathname}`);
    }
    const result = params.toString();
    return result;
  }

  public async handleResponse(response: any) {
    switch (response.code) {
      case OpCode.OK:
        this.osapi = this.handleOsapi(response.data.osapi);
        if (Config.autoRedirect) {
          window.location.href = this.osapi;
          return;
        }
        this.loading = true;
        if ('iframe_width' in response.data && response.data.iframe_width) {
          this.iframeWidth = response.data.iframe_width;
        }
        Config.game = this.name;
        break;
      case OpCode.DMM_GAME_INSTALL_NEEDED:
        this.confirm = true;
        break;
      case OpCode.DMM_FORCE_REDIRECT:
      case OpCode.DMM_GAME_ALREADY_INSTALLED:
        this.run();
        break;
      case OpCode.DMM_TOKEN_EXPIRED:
        Config.authenticated = false;
        this.router.navigate('auth/');
        break;
      default:
        this.router.navigate('game-list/');
    }
  }

  public async install() {
    const payload: IInstallPayload = {
      app_name: this.name,
      app_base: this.category,
      notification: this.notification ? 1 : 0,
      myapp: this.myapp ? 1 : 0,
    };
    const response = await this.dmm.install(payload);
    switch (response.code) {
      case OpCode.OK:
        this.confirm = false;
    }
    this.handleResponse(response);
  }

  public async run() {
    const payload = {
      app_name: this.name,
      app_base: this.category,
    };
    const response = await this.dmm.run(payload);
    this.handleResponse(response);
  }
  public async attached() {
    const searchParams = this.router.currentInstruction.queryParams;
    if (searchParams.category && searchParams.name) {
      this.name = searchParams.name;
      this.category = searchParams.category;
    } else {
      if (Config.gameCategory && Config.game) {
        this.category = Config.gameCategory;
        this.name = Config.game;
        this.router.navigateToRoute(
          'play',
          {
            category: this.category,
            name: this.name,
          },
          {
            replace: true,
          },
        );
      } else {
        return this.router.navigate('game-list/');
      }
    }

    if (((this.category !== 'all') && (this.category !== 'adult'))
      || this.name.length > 64
      || (this.category !== 'all' && Config.category === 'all')) {
      return this.router.navigate('game-list/');
    }

    this.run();
  }

  public handleMessage = (e: MessageEvent) => {
    if (e.origin === window.location.origin) {
      return;
    }
    const data = JSON.parse(e.data);
    if ('s' in data) {
      switch (data.s) {
        case 'resize_iframe':
          if ('a' in data) {
            this.iframeHeight = data.a[0];
          }
          break;
        case '__ack':
          this.loading = false;
          break;
      }
    }
  }

  public bind() {
    window.addEventListener('message', this.handleMessage);
  }

  public unbind() {
    window.removeEventListener('message', this.handleMessage);
  }
}
