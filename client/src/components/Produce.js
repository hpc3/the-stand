import React from "react";
import axios from "axios";

import ProduceButtons from "./ProduceButtons";
import ProduceInput from "./ProduceInput";

import "../componentStyles/Produce.css";
import "../componentStyles/ProduceButtons.css";

import images from "./images";

class Produce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: null,
      id: null,
      hasBeenChanged: false,
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.pushQuantityChange = this.pushQuantityChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.quantity,
      id: this.props.id,
    });
  }

  handleQuantityChange = (delta) => {
    // ADJUST THE QUANTITY STATE DEPENDING ON THE DELTA

    // ON THE CALLBACK CHECK IF THE NEW QUANTITY IS EQUAL TO THE QUANTITY THAT THE COMPONENT RECIEVES FROM <SearchContainer/>

    // IF THEY ARE EQUAL THAT MEANS THE QUANTITY IS THE SAME AS IT WAS RECIEVED FROM THE DB
    // hasBeenChanged : false
    // IF IT HAS CHANGED
    // hasBeenChanged : true

    this.setState(
      (prevState) => ({
        quantity: (prevState.quantity += delta),
      }),
      () => {
        if (this.state.quantity === this.props.quantity) {
          this.setState({
            hasBeenChanged: false,
          });
        } else {
          this.setState({
            hasBeenChanged: true,
          });
        }
      }
    );
  };

  pushQuantityChange = () => {
    const { id, quantity, hasBeenChanged } = this.state;

    // If the function has been called and the quantity has been changed fire
    // else do nothing

    if (hasBeenChanged) {
      const token = localStorage.getItem("token");

      axios({
        method: "post",
        url: "/produce/update",
        headers: { Authorization: "Bearer " + token },
        data: { id, quantity },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    // Formatting Produce Data

    const formattedPrice = this.props.price.toFixed(2);

    const stockedDate = new Date(this.props.dateLastStocked);

    let stockedMonth;

    switch (stockedDate.getMonth()) {
        case 5:
            stockedMonth = 'June';
            break;
        case 6:
            stockedMonth = 'July';
            break;
        case 7:
            stockedMonth = 'August';
            break;
        case 8:
            stockedMonth = 'September';
            break;
        default:
            stockedMonth = 'Call Henry';
            break;
    }


    let loggedIn = this.props.loggedIn;
    let buttons;

    if (loggedIn) {
      buttons = (
        <div>
          <ProduceButtons quantityChange={this.handleQuantityChange} />
          <ProduceInput quantityChange={this.handleQuantityChange} />
          <button onClick={this.pushQuantityChange}>Submit</button>
        </div>
      );
    }
    return (
      <div className="produce-card">
        <img
          src={images[this.props.id].src}
          alt={this.props.name}
          className="produce-card-images"
        />
        <h3 className="produce-card-title">
          {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
        </h3>
        <p>
          <span className="produce-value-title">Last Stocked:</span>{" "}
          {stockedMonth + " " + stockedDate.getDate()}
        </p>
        <p>
          <span className="produce-value-title">Price:</span> ${formattedPrice}
        </p>
        {/* <p><span className='produce-value-title'>Type:</span> {this.props.type}</p> */}
        {/* <p className='produce-season'><span className='produce-value-title'>Season:</span> {this.props.season}</p> */}
        <p className="produce-quantity">
          <span className="produce-value-title">Quantity:</span>{" "}
          {this.state.quantity}
        </p>
        {buttons}
      </div>
    );
  }
}

export default Produce;
