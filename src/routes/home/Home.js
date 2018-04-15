import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props;

    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */

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

/* todo setja upp tengingu við redux til að vita stöðu notanda */

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(Home);
