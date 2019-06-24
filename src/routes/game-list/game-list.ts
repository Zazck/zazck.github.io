import { Config } from 'services/config';
import { Router } from 'aurelia-router';

export interface IGameInfo {
  name: string;
  thumb: string;
  title: string;
  comment: string;
}

export class GameList {
  public category: 0 | 1 = Config.category === 'exchange' ? 1 : 0;
  public gameCategory: 0 | 1 = this.category ? (Config.gameCategory === 'all' ? 0 : 1) : 0;
  public adultList: IGameInfo[] = [];
  public allList: IGameInfo[] = [];

  public static inject = [Router];
  public constructor(
    public router: Router,
  ) {}

  private async getList(category: 'all' | 'adult'): Promise<IGameInfo[]> {
    const response = await fetch(`${category}.json`)
      .catch(_ => new Response('[]'));
    return response.json();
  }

  public async bind() {
    this.getList('all').then((list) => {
      for (let i = 0; i < list.length; i += 1) {
        this.allList.push(list[i]);
      }
    });
    if (Config.category === 'exchange') {
      this.getList('adult').then((list) => {
        for (let i = 0; i < list.length; i += 1) {
          this.adultList.push(list[i]);
        }
      });
    }
  }

  public async run(name: string) {
    Config.game = name;
    Config.gameCategory = this.gameCategory ? 'adult' : 'all';
    this.router.navigateToRoute(
      'play',
      {
        name,
        category: Config.gameCategory,
      },
      {
        replace: true,
      },
    );
  }
}
