
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Register from './routes/register';
import Books from "./routes/books";
import UserPage from './routes/userpage';

/* todo fleiri routes */

import "./App.css";

class App extends Component {
  render() {

    const {
      isAuthenticated
    } = this.props;

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />
        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />

            <Route path="/books" exact component={Books} />
            <UserRoute
              path="/profile"
              authenticated={isAuthenticated}
              component={Profile}
            />
            {/* todo fleiri route */}
            <Route path='/register' exact authenticated={isAuthenticated}  component={Register} />
            <UserRoute path='/users' authenticated={isAuthenticated} exact component={UserPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  /* todo stilla redux ef það er notað */
  return {
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.user ? state.auth.user.username : '',
    name: state.auth.user ? state.auth.user.name : '',
    isFetching: state.books.isFetching,
    message: state.books.message,
    books: state.books
  }
}

export default withRouter(connect(mapStateToProps)(App));
