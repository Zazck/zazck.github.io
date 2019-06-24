import { EventAggregator } from 'aurelia-event-aggregator';
import { Config } from './config';
import { Notify } from 'events/notify';

export enum OpCode {
  OK = 0,
  INVALID_INPUT = -1,
  NETWORK_ERROR = -2,
  DMM_TOKEN_NOT_FOUND = -10,
  TOKEN_NOT_FOUND = -11,
  DMM_METHOD_CHANGED = -12,
  DMM_PASSWORD_RESET = -13,
  DMM_INVALID_INPUT = -14,
  DMM_GAME_INSTALL_NEEDED = -15,
  DMM_GAME_ALREADY_INSTALLED = -16,
  DMM_TOKEN_EXPIRED = -17,
  DMM_INVALID_EMAIL_PASSWORD = -18,
  DMM_FORCE_REDIRECT = -19,
  CLIENT_NETWORK_ERROR = -100,
  CLIENT_COOKIES_LOST = -101,
}

// tslint:disable-next-line: variable-name
export const ResponseText = {
// tslint:disable-next-line: object-literal-key-quotes
  '0': '载入成功',
  '-1': '似乎输入了错误的数据',
  '-2': '服务器网络通信故障',
  '-10': '没找到DMM验证信息',
  '-11': '没找到验证信息',
  '-12': '似乎DMM修改了数据格式',
  '-13': 'DMM要求更改用户密码',
  '-14': '对DMM输入了错误的数据',
  '-15': '需要先安装这个游戏',
  '-16': '这个游戏已经安装过了',
  '-17': '验证信息已经过期',
  '-18': '无效的用户名和密码',
  '-19': 'DMM强制要求页面重定向',
  '-100': '浏览器与服务器通信失败',
  '-101': '丢失了登录凭据, 需重新登录',
};

export interface ILoginPayload {
  login_id: string;
  password: string;
  save_login_id: 0 | 1;
  save_password: 0 | 1;
  use_auto_login: 0 | 1;
  // app_base: 'all' | 'adult' | 'exchange';
}

export interface IResponseGameFrame {
  osapi: string;
  iframe_width: number;
}

export interface IInstallPayload {
  app_name: string;
  app_base: string;
  notification: 0 | 1;
  myapp: 0 | 1;
}

export interface IRunPayload {
  app_name: string;
  app_base: string;
}

export interface IResponseGame {
  code: OpCode.OK;
  data: IResponseGameFrame;
  cookies: object[];
}

export interface IResponseMessage {
  code: OpCode;
  data?: string;
  cookies: object[];
}

export interface IResponseError {
  code: Exclude<OpCode, OpCode.OK>;
  data: string;
  cookies: object[];
}

function createFormData(input?: object) {
  const result = new FormData();
  if (input) {
    Object.keys(input).forEach((k) => {
      const v = input[k];
      result.append(k, ((v === true) || (v === false)) ? +v : v);
    });
  }
  const cookies = Config.cookies;
  if (cookies) {
    result.append('cookies', JSON.stringify(cookies));
  } else {
    result.append('cookies', '[]');
  }
  return result;
}

export class DMM {
  private url = 'https://ss1.xrea.com/zazck.s1001.xrea.com/services/1561318500000/api.php';
  private async request(input: RequestInfo, init?: RequestInit): Promise<IResponseGame | IResponseError | IResponseMessage> {
    const response: Response | null = await fetch(input, init).catch(e => null);
    if (!response) {
      return <IResponseError>{
        code: OpCode.CLIENT_NETWORK_ERROR,
        data: ResponseText[OpCode.CLIENT_NETWORK_ERROR],
        cookies: [],
      };
    }
    const result: IResponseGame | IResponseError | IResponseMessage = await response.json();
    if (result.cookies) {
      Config.cookies = result.cookies;
    }
    if (result.code === OpCode.OK) {
      return result;
    }
    if (result.code === OpCode.DMM_TOKEN_EXPIRED) {
      Config.authenticated = false;
    }
    return result;
  }

  public async login(payload: ILoginPayload, exchange?: boolean): Promise<IResponseMessage | IResponseError> {
    const data = createFormData(payload);
    data.append('method', exchange ? 'login_exchange' : 'login');
    const result: IResponseMessage | IResponseError = <IResponseMessage | IResponseError>await this.request(this.url, {
      method: 'POST',
      body: data,
    });
    if (result.code === OpCode.OK) {
      if (payload.save_login_id) {
        Config.loginID = payload.login_id;
      } else {
        Config.loginID = null;
      }
      if (payload.save_password) {
        Config.password = payload.password;
      } else {
        Config.password = null;
      }
      if (payload.use_auto_login) {
        Config.autoLogin = true;
      } else {
        Config.autoLogin = null;
      }
      if (exchange) {
        Config.category = 'exchange';
      } else {
        Config.category = 'all';
      }
      Config.authenticated = true;
    }
    return result;
  }

  public async logout(): Promise<IResponseMessage | IResponseError> {
    const data = createFormData();
    data.append('method', 'logout');
    const result: IResponseMessage | IResponseError = <IResponseMessage | IResponseError>await this.request(this.url, {
      method: 'POST',
      body: data,
    });
    if (result.code === OpCode.OK) {
      Config.authenticated = false;
    }
    return result;
  }

  public async install(payload: IInstallPayload): Promise<IResponseGame | IResponseError> {
    if (!Config.cookies) {
      return;
    }
    const data = createFormData(payload);
    data.append('method', 'install');
    return <Promise<IResponseGame | IResponseError>> this.request(this.url, {
      method: 'POST',
      body: data,
    });
  }

  public async run(payload: IRunPayload): Promise<IResponseGame | IResponseError> {
    if (!Config.cookies) {
      return;
    }
    const data = createFormData(payload);
    data.append('method', 'run');
    return <Promise<IResponseGame | IResponseError>>this.request(this.url, {
      method: 'POST',
      body: data,
    });
  }
}
