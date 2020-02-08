import { Store } from "@store/index";

export interface IColumnViewModel {
  width?: string | number;
  title: string;
  dataIndex: string;
  orderIndex?: string;
  sorter?: boolean;
  render?: (value?: string | number | boolean | IKeyValueMap<Object>[], item?: Object) => string | React.ReactElement<any>;
}

export interface IStoreContainer {
  store: Store;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IIdName {
  id: string;
  name: string;
}

export interface IPageResult<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}