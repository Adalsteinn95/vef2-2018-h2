import React, { Component } from "react";
import { connect } from "react-redux";

/* todo sækja actions frá ./actions */

import "./Books.css";

class Books extends Component {
  state = { data: null, loading: true, error: false, offset: 0 };

  async componentDidMount() {
    this.tryToFetch();
  }

  async tryToFetch() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error("Error fetching data", e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData() {
    const url = `${process.env.REACT_APP_SERVICE_URL}books?offset=${
      this.state.offset
    }`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  handleNextPageClick = e => {
    this.tryToFetch();
    console.log(this.state.offset);
    this.setState((prevState, props) => {
      return { offset: prevState.offset + 10 };
    });
  };
  handlePrevPageClick = e => {
    this.tryToFetch();
    console.log(this.state.offset);
    this.setState((prevState, props) => {
      return { offset: prevState.offset - 10 };
    });
  };
  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return <div>Sæki gögn...</div>;
    }

    if (error) {
      return <div>Villa við að sækja gögn</div>;
    }

    return (
      <div>
        <h2>Bækur</h2>
        <div key={this.state.offset}>
          {data.items.map(book => {
            return (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>Eftir {book.author}</p>
              </div>
            );
          })}
        </div>
        <button onClick={this.handlePrevPageClick}>Fyrri síða</button>
        <button onClick={this.handleNextPageClick}>Næsta síða</button>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Books;
