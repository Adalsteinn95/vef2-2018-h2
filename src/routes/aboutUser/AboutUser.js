import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOneUser } from "../../actions/getAllUsers";
import { getRead } from "../../actions/books";
import ReadBooks from "../../components/readBooksList";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./AboutUser.css";
class AboutUser extends Component {
  state = {
    id: null
  };
  async componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchOneUser(id));

    const { page } = this.state;
    const offset = `offset=${page * 10}`;
    dispatch(getRead(`users/me/read?${offset}`));
    //dispatch(getRead(`users/me/read?${offset}`));
  }

  async componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;

    if (prevState.id !== this.props.match.params.id) {
      try {
        dispatch(fetchOneUser(this.props.match.params.id));
        this.setState({ id: this.props.match.params.id });
      } catch (error) {
        this.setState({ error: true, loading: false });
      }
    }
  }

  render() {
    const { user, isFetching, message } = this.props;
    const { id } = this.props.match.params;

    if (message) {
      return <div>{message}</div>;
    }

    if (isFetching || !user) {
      return <div>Sæki gögn...</div>;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="registerAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div>
          <div className="user--container">
            <img src={user.image || "/profile.jpg"} alt="profile" />
            <h1>{user.name}</h1>
          </div>
          <ReadBooks userId={id} meReadBooks={false} deleteOption={false} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.getAllUsers.isFetching,
    message: state.getAllUsers.message,
    user: state.getAllUsers.user
  };
};

export default connect(mapStateToProps)(AboutUser);
