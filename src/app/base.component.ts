import {environment} from '../environments/environment';

export abstract class BaseComponent {

  env = environment;

  viewName: string;

  protected constructor() {
  }

}
