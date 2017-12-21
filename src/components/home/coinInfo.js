import React, { Component } from "react";
import { Link } from "react-router-dom";

class CoinInfo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
         color: 'grey',
      };
    }
  
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.price);
        // console.log(this.props.price);
        // console.log(nextProps);
        setInterval(() => {
                let newPrice = parseFloat(nextProps.price).toFixed(1);
                let existingPrice = parseFloat(this.props.price).toFixed(1);
                console.log(newPrice);
                console.log(existingPrice);
            if (parseFloat(newPrice) > parseFloat(existingPrice)) {
                console.log('higher');
                this.setState({ color: 'green' });
            } else if (parseFloat(newPrice) < parseFloat(existingPrice)) {
                console.log('lower');
                this.setState({ color: 'red' });
            } else {
                console.log('same');
                this.setState({ color: 'grey' });
            }
        },10000);
    }
  
    render() {
      const { long, short, price } = this.props;
      return (
         <div className={`panel__item ${this.state.color}`}>
           <p>Name: {long}</p>
           <p>Short: {short}</p>
           <p>Price: ${price}</p>
           <Link className="button" to={`/${short}`}>
              View Coin
           </Link>
         </div>
       );  
    }
  }

  export default CoinInfo;