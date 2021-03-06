/* eslint-disable react/no-multi-comp*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "./redux/actions";
import rootReducer from "./redux/reducers";

import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AlertPage from 'pages/AlertPage';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
import BadgePage from 'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import ButtonPage from 'pages/ButtonPage';
import CardPage from 'pages/CardPage';
import ChartPage from 'pages/ChartPage';
// pages
import DropdownPage from 'pages/DropdownPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ModalPage from 'pages/ModalPage';
import ProgressPage from 'pages/ProgressPage';
import TablePage from 'pages/TablePage';
import TypographyPage from 'pages/TypographyPage';
import WidgetPage from 'pages/WidgetPage';
import componentQueries from 'react-component-queries';
import './styles/reduction.css';

//Main
import {
  DashBoardPage,
  Contact,
  Footer,
  Header,
  RegisterPage,
  HomePage,
  About,
  NotFound,
  LoginPage,
  ACTForm,
  Assignments,
  Profile,
  StatsPage,
} from 'custom';

import {
  DemoDashboardPage,
  DemoProfilePage,
  DemoStatsPage,
  DemoTestsPage,
} from 'demos';

import configureStore from 'redux/store/configureStore';

let store = configureStore();

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class RootContainerComponent extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoading: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
    }),
    loadUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, layout: Layout, path, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        const interpolatedPath = `/demo${path}`;
        return <Redirect to={interpolatedPath} />;
      } else {
        return (
          <Layout>
            <ChildComponent {...props} />
          </Layout>
        );
      }
    }} />;
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
          <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={props => (
                <HomePage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <LoginPage {...props} />
              )}
            />

            <LayoutRoute
              exact
              path="/register"
              layout={EmptyLayout}
              component={props => (
                <RegisterPage {...props} />
              )}
            />

            <LayoutRoute
              exact
              path="/about"
              layout={MainLayout}
              component={About}
            />

            <LayoutRoute
              exact
              path="/contact"
              layout={MainLayout}
              component={Contact}
            />



            {/* private routes */}

            <PrivateRoute
              exact
              path="/dashboard"
              layout={MainLayout}
              component={DashBoardPage}
            />
            <PrivateRoute
              exact
              path="/stats"
              layout={MainLayout}
              component={StatsPage}
            />
            <PrivateRoute
              exact
              path="/profile"
              layout={MainLayout}
              component={DemoProfilePage}
            />
            <PrivateRoute
              exact
              path="results/tests"
              layout={MainLayout}
              component={DemoTestsPage}
            />


            {/* demo */}

            <LayoutRoute
              exact
              path="/demo/dashboard"
              layout={MainLayout}
              component={DemoDashboardPage}
            />
            <LayoutRoute
              exact
              path="/demo/stats"
              layout={MainLayout}
              component={DemoStatsPage}
            />
            <LayoutRoute
              exact
              path="/demo/results/tests"
              layout={MainLayout}
              component={DemoTestsPage}
            />

            <LayoutRoute
              exact
              path="/demo/profile"
              layout={MainLayout}
              component={DemoProfilePage}
            />


            {/* models */}
            <LayoutRoute
              exact
              path="/login-modal"
              layout={MainLayout}
              component={AuthModalPage}
            />
            <LayoutRoute
              exact
              path="/buttons"
              layout={MainLayout}
              component={ButtonPage}
            />
            <LayoutRoute
              exact
              path="/cards"
              layout={MainLayout}
              component={CardPage}
            />
            <LayoutRoute
              exact
              path="/widgets"
              layout={MainLayout}
              component={WidgetPage}
            />
            <LayoutRoute
              exact
              path="/typography"
              layout={MainLayout}
              component={TypographyPage}
            />
            <LayoutRoute
              exact
              path="/alerts"
              layout={MainLayout}
              component={AlertPage}
            />
            <LayoutRoute
              exact
              path="/tables"
              layout={MainLayout}
              component={TablePage}
            />
            <LayoutRoute
              exact
              path="/badges"
              layout={MainLayout}
              component={BadgePage}
            />
            <LayoutRoute
              exact
              path="/button-groups"
              layout={MainLayout}
              component={ButtonGroupPage}
            />
            <LayoutRoute
              exact
              path="/dropdowns"
              layout={MainLayout}
              component={DropdownPage}
            />
            <LayoutRoute
              exact
              path="/progress"
              layout={MainLayout}
              component={ProgressPage}
            />
            <LayoutRoute
              exact
              path="/modals"
              layout={MainLayout}
              component={ModalPage}
            />
            <LayoutRoute
              exact
              path="/forms"
              layout={MainLayout}
              component={FormPage}
            />
            <LayoutRoute
              exact
              path="/input-groups"
              layout={MainLayout}
              component={InputGroupPage}
            />
            <LayoutRoute
              exact
              path="/charts"
              layout={MainLayout}
              component={ChartPage}
            />
            <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.ajaxCallsInProgress > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}


const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);