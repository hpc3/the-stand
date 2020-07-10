import React from "react";
import styled from "styled-components";
import axios from "axios";

import ProduceControls from "./ProduceControls";

import images from "./images";

const ProduceCard = styled.div`
  color: green;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: white;
  padding: 1em;

  box-sizing: border-box;

  border-radius: 1em;

  @media (max-width: 680px) {
    width: 90%;
  }
`;

const ProduceCardHeader = styled.div`
  align-self: center;
  text-align: center;
`;

const ProduceCardImage = styled.img`
  border-radius: 1em;
`;




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

    // ON THE CALLBACK CHECK IF THE NEW QUANTITY IS EQUAL TO THE QUANTITY THAT THE COMPONENT RECIEVES FROM <ProduceBin/>

    // IF THEY ARE EQUAL THAT MEANS THE QUANTITY IS THE SAME AS IT WAS RECIEVED FROM THE DB
    // hasBeenChanged : false
    // IF IT HAS CHANGED
    // hasBeenChanged : true


    this.setState(
      (prevState) => ({
        quantity: (prevState.quantity += delta),
      }),
      () => {
        this.state.quantity === this.props.quantity
          ? this.setState({ hasBeenChanged: false })
          : this.setState({ hasBeenChanged: true });
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
    }else{
      alert('Quantity has not been changed');
    }
  };

  render() {
    // Formatting Produce Data

    const formattedPrice = this.props.price.toFixed(2);



    const stockedDate = new Date(this.props.dateLastStocked);
    // Time
    let hour = stockedDate.getHours() + 1;


    if(hour > 12){
      hour = hour - 12;
    }

    let minutes = stockedDate.getMinutes() + 1;

    if(minutes < 10){
      minutes = '0' + minutes;
    }





    const ampm = hour >= 12 ? 'am' : 'pm';


    const formattedTime = hour + ':' + minutes + ' ' + ampm;

    // Suffix
    let stockedDateSuffix;


    if (stockedDate.getDate() > 3 && stockedDate.getDate() < 21) {
      stockedDateSuffix = "th";
    }

    switch (stockedDate.getDate() % 10) {
      case 1:
        stockedDateSuffix = "st";
        break;
      case 2:
        stockedDateSuffix = "nd";
        break;
      case 3:
        stockedDateSuffix = "rd";
        break;
      default:
        stockedDateSuffix = "th";
        break;
    }
    // ./Suffix



    // Month String
    let stockedMonth;
    switch (stockedDate.getMonth()) {
      case 5:
        stockedMonth = "June";
        break;
      case 6:
        stockedMonth = "July";
        break;
      case 7:
        stockedMonth = "August";
        break;
      case 8:
        stockedMonth = "September";
        break;
      default:
        stockedMonth = "Call Henry";
        break;
    }

    const formattedDate = stockedMonth + ' ' + stockedDate.getDate() + stockedDateSuffix;
    // ./Month String


    let loggedIn = this.props.loggedIn;
    let controls;

    if (loggedIn) {
      controls = (
        <ProduceControls
          changeHandler={this.handleQuantityChange}
          pushQuantityChange={this.pushQuantityChange}
        />
      );
    }
    return (
      <ProduceCard>
        <ProduceCardHeader>
          <ProduceCardImage
            src={images[this.props.id].src}
            alt={this.props.name}
          />
          <h3>
            {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
          </h3>
        </ProduceCardHeader>
        <div>
          <p>Quantity: {this.state.quantity}</p>
          <p>Price: ${formattedPrice}</p>
          <p>Last Stocked: {formattedDate + ' ' + formattedTime }</p>
        </div>
        {controls}
      </ProduceCard>
    );
  }
}

export default Produce;
