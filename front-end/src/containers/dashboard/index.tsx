import React from 'react';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import { DashboardBusiness, IDashboardBusiness } from '@business/dashboard';

@inject(DashboardBusiness)
@observer
export default class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  constructor(props: IDashboardProps) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { getData } = this.props;

    getData();
  }

  render() {
    const { text } = this.props;

    return <div>{text}</div>;
  }
}

interface IDashboardProps extends Partial<IDashboardBusiness>, RouteComponentProps {

}

interface IDashboardState {
}