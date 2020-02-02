/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import BrowsePage from 'containers/BrowsePage/Loadable';
import MovieDetailPage from 'containers/MovieDetailPage/Loadable';
import BorrowsPage from 'containers/BorrowsPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header/Loadable';
import Footer from 'components/Footer';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Header />
    <Switch>
      {/* <Route exact path="/" component={HomePage} /> */}
      {/* <Route path="/features" component={FeaturePage} /> */}
      <Route exact path="/login" component={LoginPage} />
      <Route path="/browse" component={BrowsePage} />
      <Route path="/movie/:id" component={MovieDetailPage} />
      <Route path="/borrows" component={BorrowsPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/header" component={Header} />
      <Route path="" component={LoginPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
