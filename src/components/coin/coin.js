import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./coin.scss";

class Coin extends Component {
  // Create initial state and pass props
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      coin: []
    };
  }

  fetchCoin() {
    // Get coin uid from URL
    const { short } = this.props.match.params;
    // Set API URL to specific coin
    const url = `http://coincap.io/page/${short}/`;

    //console.log(url);

    // Fetch data
    fetch(url)
      // Turn response into JSON
      .then(response => response.json())
      // Update state with coin details
      .then(coin =>
        this.setState({
          coin,
          isLoading: false
        })
      )
      // Catch the errors
      .catch(error => console.log("parsing failed", error));
  }

  componentDidMount() {
    this.fetchCoin();
  }

  render() {
    // Export const's from state
    // Give access inside of render method
    const { isLoading, coin } = this.state;

    return (
      <div className="container__wrap container__wrap--coin">
        <div className={`content ${isLoading ? "is-loading" : ""}`}>
          <div className="panel">
            <h2>{coin.display_name}</h2>
            <p>
              <span>Price:</span> ${coin.price}
            </p>
            <p>
              <span>ID:</span> {coin.id}
            </p>
            <p>
              <span>btcCap:</span> {coin.totalCap}
            </p>
          </div>
          <div className="loader">
            <div className="loader__icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default Coin;
