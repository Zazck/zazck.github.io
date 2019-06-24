import { Drawer } from './components/drawer/drawer';
import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration, NavigationInstruction, Next } from 'aurelia-router';
import { AuthorizeStep } from 'auth.guard';
import { EventAggregator } from 'aurelia-event-aggregator';

export class App {
  public router: Router;
  public drawer: Drawer;

  public static inject = [EventAggregator];
  public constructor(
    public ea: EventAggregator,
  ) { }

  attached() {
    this.ea.subscribe('notice', (e: any) => {});
  }

  private readonly closeDrawerPostRenderStep = {
    run: (_: NavigationInstruction, next: Next) => {
      setTimeout(() => this.drawer.close(), 0);
      return next();
    },
  };

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = '躲猫猫';
    config.map([
      {
        route: 'auth',
        name: 'auth',
        moduleId: PLATFORM.moduleName('./routes/auth/auth'),
        nav: true,
        title: '登录',
        settings: {
          icon: 'exit_to_app',
        },
      },
      {
        route: 'game-list',
        name: 'game-list',
        moduleId: PLATFORM.moduleName('./routes/game-list/game-list'),
        nav: true,
        title: '游戏列表',
        settings: {
          auth: true,
          icon: 'list',
        },
      },
      {
        route: ['', 'play'],
        name: 'play',
        moduleId: PLATFORM.moduleName('./routes/play/play'),
        nav: true,
        title: '运行游戏',
        settings: {
          auth: true,
          picked: true,
          icon: 'play_arrow',
        },
      },
      {
        route: ['settings'],
        name: 'settings',
        moduleId: PLATFORM.moduleName('./routes/settings/settings'),
        nav: true,
        title: '设置',
        settings: {
          icon: 'settings',
        },
      },
      {
        route: ['about'],
        name: 'about',
        moduleId: PLATFORM.moduleName('./routes/about/about'),
        nav: true,
        title: '关于',
        settings: {
          icon: 'info',
        },
      },
    ]);
    config.options.pushState = true;
    config.addAuthorizeStep(AuthorizeStep);
    config.addPostRenderStep(this.closeDrawerPostRenderStep);
    this.router = router;
  }
}
