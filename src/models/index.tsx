import { removeToken, saveToken } from '@/util/token';
import { observable, action, toJS } from 'mobx';
import decode from 'jwt-decode';

export class Index {
  @observable
  curUser = {};

  @action saveCurUser(e) {
    console.log(decode(e));
    this.curUser = decode(e);
    console.log('111', this.curUser);
    saveToken(e);
  }

  @action
  async removeCurUser() {
    // this.curUser = {};
    // removeToken();
  }
}
