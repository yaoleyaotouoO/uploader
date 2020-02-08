import { configure } from 'mobx';
import DashboardStore from './dashboard';

configure({ enforceActions: 'observed' });
export class Store {
  dashboardStore: DashboardStore;

  constructor() {
    this.dashboardStore = new DashboardStore();
  }
}

export default new Store();