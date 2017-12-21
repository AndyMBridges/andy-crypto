import React, { Component } from "react";
import { Link } from "react-router-dom";

import Coininfo from './coinInfo.js';

import "./home.scss";

// const io = require('socket.io-client')  
// const socket = io.connect('https://coincap.io');  

// const socket = io.connect('https://coincap.io');

class Home extends Component {
  // Create initial state and pass props
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      coins: []
    }
  }

  // Custom fetch data method
  fetchData() {

      // Fetch data
      fetch('http://coincap.io/front')
      // Turn response into JSON
      .then(response => response.json())
      // Take parsedJSON and log results
      // Create individual object for each of the users
      .then(parsedJSON => parsedJSON.map(coin => (
          {
              long: `${coin.long}`,
              short: `${coin.short}`,
              price: `${coin.price}`
          }
      )))
      // Overwrite empty array with new contacts
      // Set array to contacts state and set isLoading to false
      .then(coins => {
        this.setState({
            coins,
            isLoading: false
        })
        //console.log(tradeMsg.msg.price);
      })
      // Catch the errors
      .catch(error => console.log('parsing failed', error))
  }


  componentDidMount() {
    setInterval(() => {
      this.fetchData();
      console.log('refreshed'); 
    }, 10000);
  }

  render() {
    const { isLoading, coins } = this.state;
    //console.log(flashClass);
    return (
      <div className="container__wrap container__wrap--home">
        <div className={`content ${isLoading ? "is-loading" : ""}`}>
          <div className="panel">
            {// If loading is not true & sets length is greater than zero
            // Return each set form array using map function
            // Otherwise return null
            !isLoading && coins.length > 0
              ? coins.map(coin => {
                  // Destruct each of the items in let variable
                  let { long, short, price } = coin;
                  return (
                    <Coininfo key={short} price={price} short={short} long={long} />
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
