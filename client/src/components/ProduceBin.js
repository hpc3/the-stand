import React, { Component } from "react";

import styled from "styled-components";

import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import SectionTitle from "./SectionTitle";
import SearchTools from "./SearchTools";
import Produce from "./Produce";
// import Comment from './Comment'
import Login from "./Login";

// import "../componentStyles/SearchContainer.css";

const ProduceBinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b28a96;
  padding: 1em 0;
  height: auto;
`;

const ProduceWrapper = styled.div`
  height: ${props => props.loggedIn ? "195vh" : "165vh"};
  display: grid;
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5%;
  margin: 0 auto;
  justify-items: center;
  justify-content: center;

  

  @media (max-width: 1015px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1%;
    height: ${props => props.loggedIn ? "235vh" : "200vh"};
  }

  @media (max-width: 680px) {
    height: ${(props) => (props.loggedIn ? "411vh" : "311vh")};
    grid-template-columns: 1fr;
  }
`;

class ProduceBin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produce: [],
      comments: [],
      error: "",
      loggedIn: false,
    };
    this.sortList = this.sortList.bind(this);
    this.handleUserState = this.handleUserState.bind(this);
    this.getProduce = this.getProduce.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    this.getProduce();
  }

  getProduce() {
    axios
      .get("/produce")
      .then((res) => {
        this.setState({
          produce: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data,
        });
      });
  }

  getComments() {
    const token = localStorage.getItem("token");

    axios({
      method: "GET",
      url: "/comment",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        this.setState({
          comments: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data,
        });
      });
  }

  handleUserState() {
    this.setState(
      (prevState) => ({
        loggedIn: !prevState.loggedIn,
      }),
      () => {
        if (this.state.loggedIn === true) {
          this.getComments();
        } else {
          localStorage.removeItem("token");
        }
      }
    );
  }

  sortList(e) {
    const sortType = e.target.value;

    let tempArray;

    switch (sortType) {
      case "a-z":
        tempArray = this.state.produce.sort((a, b) => {
          if (b.name > a.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        });

        this.setState({
          produce: tempArray,
        });
        break;
      case "z-a":
        tempArray = this.state.produce.sort((a, b) => {
          if (b.name < a.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });

        this.setState({
          produce: tempArray,
        });
        break;
      case "h-l":
        tempArray = this.state.produce.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
        this.setState({
          produce: tempArray,
        });
        break;
      case "l-h":
        tempArray = this.state.produce.sort((a, b) => {
          if (b.price > a.price) return -1;
          if (b.price < a.price) return 1;
          return 0;
        });
        this.setState({
          produce: tempArray,
        });
        break;
      default:
        break;
    }
  }

  render() {

    let errorWithData = (
      <h1 style={{ textAlign: "center" }}>
        {" "}
        That's weird, something went wrong{" "}
      </h1>
    );

    let produceCards;

    if (this.state.produce.length !== 0) {
      produceCards = this.state.produce.map((produce, index) => (
        <Produce
          {...produce}
          key={produce.id}
          index={index}
          loggedIn={this.state.loggedIn}
        />
      ));
    }

    return (
      <BrowserRouter>
      <ProduceBinContainer id="produce">
        <Route path="/Dad">
          <Login
            loginState={this.state.loggedIn}
            loginHandler={this.handleUserState}
          />
        </Route>
        <SectionTitle fontColor="white" borderBottom>
          Produce
        </SectionTitle>
        <SearchTools sortList={this.sortList} />

        {this.state.produce.length !== 0 ? <ProduceWrapper loggedIn={this.state.loggedIn} > {produceCards} </ProduceWrapper> : errorWithData}

      </ProduceBinContainer>
      </BrowserRouter>
    );
  }
}
export default ProduceBin;
