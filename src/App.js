import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Route, Switch, withRouter } from "react-router-dom";

import { checkToken } from "./actions/auth";

import UserRoute from "./components/user-route";
import Header from "./components/header";
import AddBook from "./components/addbook";
import UpdateBook from "./components/updatebook";

import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";
import NotFound from "./routes/not-found";
import Register from "./routes/register";
import Books from "./routes/books";
import Book from "./routes/book";
import UserPage from "./routes/userpage";
import AboutUser from "./routes/aboutUser";

/* todo fleiri routes */

import "./App.css";

class App extends Component {
  componentDidUpdate() {
    const { isAuthenticated, user } = this.props;
    if (user) {
      this.props.dispatch(checkToken("/users/me"));
    }
  }
  render() {
    const { isAuthenticated, user } = this.props;
    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />
        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />

            <Route path="/books" exact component={Books} />
            <Route path="/books/:id(\d+)" exact component={Book} />
            <UserRoute
              path="/profile"
              authenticated={isAuthenticated}
              component={Profile}
            />
            {/* todo fleiri route */}
            <Route path="/register" exact component={Register} />
            <UserRoute
              path="/books/new"
              authenticated={isAuthenticated}
              exact
              component={AddBook}
            />
            <UserRoute
              path="/books/:id/edit"
              authenticated={isAuthenticated}
              exact
              component={UpdateBook}
            />
            <UserRoute
              path="/users"
              authenticated={isAuthenticated}
              exact
              component={UserPage}
            />
            <UserRoute
              path="/users/:id"
              authenticated={isAuthenticated}
              exact
              component={AboutUser}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  /* todo stilla redux ef það er notað */
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    username: state.auth.user ? state.auth.user.username : "",
    name: state.auth.user ? state.auth.user.name : "",
    isFetching: state.books.isFetching,
    message: state.books.message,
    books: state.books
  };
};

export default withRouter(connect(mapStateToProps)(App));
