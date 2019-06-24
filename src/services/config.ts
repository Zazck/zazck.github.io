interface IConfig {
  autoLogin: boolean;
  autoRedirect: boolean;
  loginID: string;
  password: string;
  category: 'all' | 'exchange'; // 'adult'
  game: string;
  gameCategory: 'all' | 'adult';
  cookies: object;
  authenticated: boolean;
  autoRelogin: boolean;
}

// tslint:disable-next-line: variable-name
const Config: IConfig = {} as IConfig;

const configNames = [
  'autoLogin',
  'autoRedirect',
  'loginID',
  'password',
  'category',
  'game',
  'gameCategory',
  'cookies',
  'authenticated',
  'autoRelogin',
];

configNames.forEach(k => Object.defineProperty(Config, k, {
  get() {
    return JSON.parse(localStorage.getItem(k));
  },
  set(v) {
    if (v === null) {
      localStorage.removeItem(k);
    } else {
      localStorage.setItem(k, JSON.stringify(v));
    }
  },
}));

export {
  Config,
};
