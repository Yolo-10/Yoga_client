import { removeToken, saveToken } from '@/util/token';
import { observable, action, toJS } from 'mobx';
import decode from 'jwt-decode';

export class Index {
  @observable
  curUser = undefined;

  @action saveCurUser(e) {
    this.curUser = decode(e);
    saveToken(e);
  }

  @action
  async removeCurUser() {
    this.curUser = undefined;
    removeToken();
  }
}
