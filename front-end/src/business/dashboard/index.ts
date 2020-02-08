import { IStoreContainer } from "@common/interface/base";

export const DashboardBusiness = ({ store }: IStoreContainer): IDashboardBusiness => {
  const { dashboardStore } = store;

  const propsConnect = {
    text: dashboardStore.text
  };

  const dispatchConnect = {
    getData: () => dashboardStore.getData()
  };

  return {
    ...propsConnect,
    ...dispatchConnect,
  };
};

export interface IDashboardBusiness {
  text: string;
  getData: () => void;
}