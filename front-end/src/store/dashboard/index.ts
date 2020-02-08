import { observable, action, runInAction } from 'mobx';
import http, { Q } from '@http';

export default class DashboardStore {
  @observable text: string = '';

  // @action
  // async getData() {
  //   const promise = this.api().getData();
  //   const rawData = await promise;
  //   runInAction(() => {
  //     this.text = rawData;
  //   });

  //   return promise;
  // }

  @action
  getData() {
    this.text = 'Dashboard';
  }

  api() {
    return {
      getData: (): Promise<string> => {
        return Q(http.get(`xxx/xxx`));
      }
    };
  }
}