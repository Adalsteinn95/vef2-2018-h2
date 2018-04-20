import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.shape({
      action: PropTypes.string,
      block: PropTypes.func,
      go: PropTypes.func,
      goBack: PropTypes.func,
      goForward: PropTypes.func,
      length: PropTypes.number,
      listen: PropTypes.func
    }),
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
      url: PropTypes.string,
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        id: PropTypes.number
      })
    }),
    isAuthenticated: PropTypes.bool
  };
  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <div>
          <h1>Velkominn á Bókasafnið!</h1>
          <p>
            Þú ert skráður notandi og getur því{" "}
            <Link to="/books/new">skráð bækur</Link> og breytt{" "}
            <Link to="/books">þeim sem til eru</Link>
          </p>
          <p>
            Einnig getur þú skoðað <Link to="/users">aðra notendur</Link>
          </p>
        </div>
      );
    }

    return (
      <div>
        <h1>Velkominn á Bókasafnið!</h1>
        <p>
          Til að njóta bókasafnið til fullnustu mælum við með að{" "}
          <Link to="/login">Skrá sig inn.</Link> Þangað til getur þú skoðað{" "}
          <Link to="/books">allar bækurnar.</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(Home);
