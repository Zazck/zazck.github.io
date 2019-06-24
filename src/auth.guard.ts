import { Config } from 'services/config';
import { Redirect, NavigationInstruction, Next } from 'aurelia-router';

export class AuthorizeStep {
  run(navigationInstruction: NavigationInstruction, next: Next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      if (!Config.category || !Config.authenticated) {
        return next.cancel(new Redirect('auth/'));
      }
    }

    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.picked)) {
      if ('category' in navigationInstruction.queryParams) {
        const searchCategory: string = navigationInstruction.queryParams.category;
        if ((searchCategory !== 'all') && (searchCategory !== 'adult')) {
          return next.cancel(new Redirect('game-list/'));
        }
        if (searchCategory !== 'all' && Config.category === 'all') {
          return next.cancel(new Redirect('game-list/'));
        }
      }
      if (!Config.game || !Config.gameCategory) {
        return next.cancel(new Redirect('game-list/'));
      }
    }

    return next();
  }
}
