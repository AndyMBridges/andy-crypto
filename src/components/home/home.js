import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./home.scss";

class Home extends Component {
  // Create initial state and pass props
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      coins: []
    };
  }

  // Custom fetch data method
  fetchData() {

      // Fetch data
      fetch('http://coincap.io/front')
      // Turn response into JSON
      .then(response => response.json())
      // Take parsedJSON and log results
      // Create individual object for each of the users
      .then(parsedJSON => parsedJSON.map(item => (
          {
              long: `${item.long}`,
              short: `${item.short}`,
              price: `${item.price}`
          }
      )))
      // Overwrite empty array with new contacts
      // Set array to contacts state and set isLoading to false
      .then(coins => this.setState({
          coins,
          isLoading: false
      }))
      // Catch the errors
      .catch(error => console.log('parsing failed', error))
  }


  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { isLoading, coins } = this.state;
    return (
      <div className="container__wrap container__wrap--home">
        <div className={`content ${isLoading ? "is-loading" : ""}`}>
          <div className="panel">
            {// If loading is not true & sets length is greater than zero
            // Return each set form array using map function
            // Otherwise return null
            !isLoading && coins.length > 0
              ? coins.map(set => {
                  // Destruct each of the items in let variable
                  let { long, short, price } = set;
                  return (
                    <div className="panel__item" key={short}>
                      <p>Name: {long}</p>
                      <p>Short: {short}</p>
                      <p>Price: ${price}</p>
                      <Link className="button" to={`/${short}`}>
                        View Coin
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="loader">
            <div className="loader__icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
