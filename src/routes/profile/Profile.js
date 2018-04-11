import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Upplýsingar</h1>
        <form>
          <input type="file" />
          <Button children="Uppfæra mynd" />
        </form>
        <form>
          <div>
            <label>Nafn:</label>
            <input type="text" />
            <Button children="Uppfæra nafn" />
          </div>
        </form>
        <form>
          <div>
            <label>Lykilorð:</label>
            <input type="password" />
          </div>
          <div>
            <label>Lykilorð, aftur:</label>
            <input type="password" />
          </div>
          <Button children="Uppfæra lykilorð" />
        </form>
        <h1>Lesnar Bækur</h1>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Profile);
