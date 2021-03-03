import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useRouteMatch } from "react-router-dom";

import { connect } from "react-redux";
import { managerLogout } from "../../actions/managerActions";

import toggleNav from "../../images/mobile-nav-toggle.png";
import signOut from "../../images/sign-out.png";

const ManagerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: black;
  box-sizing: border-box;
  padding: ${(props) => (props.navExtended ? "50px 20px" : "0")};
  max-width: 210px;
  /* box-shadow: 10px 2px 5px -8px black; */
  flex: ${(props) => (props.navExtended ? "1" : "0.5")};
  @media (max-width: 700px) {
    position: ${(props) => (props.navExtended ? "absolute" : "static")};
    z-index: ${(props) => (props.navExtended ? "1" : "0")};
    height: ${(props) => (props.navExtended ? "100%" : null)};

    flex: ${(props) => (props.navExtended ? ".5" : "1")};
    /* display: ${(props) => (props.navExtended ? "flex" : "none")}; */
    /* align-self: center; */
    /* align-items: center;
    box-shadow: none;
    text-align: center; */
    /* display: none; */
  }
`;

const ManagerMobileWrapper = styled.div``;

const ManagerNavBarLinks = styled(NavLink)`
  text-decoration: none;

  /* color: ${(props) => (props.mobile ? "white" : "black")}; */
  color: white;
`;

const ManagerNavButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: ${(props) => (props.mobile ? "50%" : "100%")};

  /* width: 100%; */
  height: 50px;
  color: white;
  font-size: 1em;
  font-family: inherit;

  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

const ManagerNav = ({ managerLogout }) => {
  // Desktop Default : extended
  // Mobile Defult : collapsed

  const [navExtended, toggleNavExtended] = useState(window.innerWidth > 700);
  const [isMobile, toggleIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const checkIsMobile = () => {
      toggleIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  });

  const match = useRouteMatch();

  const deskTopNavExtended = (
    <>
      <h1 style={{ color: "white" }}>Manager</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "15em",
          justifyContent: "space-evenly",
        }}
      >
        <ManagerNavBarLinks
          exact
          children={"Produce"}
          to={`${match.url}`}
          mobile={"false"}
          activeStyle={{
            color: "green",
          }}
          onClick={() => {
            console.log("clicked produce");
          }}
        />
        <ManagerNavBarLinks
          children={"Comments"}
          to={`${match.url}/comments`}
          mobile={"false"}
          activeStyle={{
            color: "red",
          }}
        />

        <ManagerNavBarLinks
          children={"Sales"}
          to={`${match.url}/sales`}
          mobile={"false"}
          activeStyle={{
            color: "yellow",
          }}
        />
      </div>

      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      > */}

      <ManagerNavButton
        onClick={() => toggleNavExtended(false)}
        hoverColor="blue"
      >
        <img
          src={toggleNav}
          alt="Collapse Nav"
          style={{ height: "100%", transform: "rotate(90deg)" }}
        />
        Collapse
      </ManagerNavButton>

      <ManagerNavButton onClick={managerLogout} hoverColor="red">
        <img src={signOut} style={{ height: "100%" }} alt="Sign Out Icon" />
        Sign Out
      </ManagerNavButton>

      {/* </div> */}
    </>
  );
  const deskTopNavCollapsed = (
    <>
      <button
        onClick={() => toggleNavExtended(true)}
        style={{
          width: "75%",
          background: "none",
          border: "none",
          alignSelf: "center",
          marginTop: "3em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={toggleNav}
          alt="Expand Nav"
          style={{ height: "50px", transform: "rotate(-90deg)" }}
        />
      </button>
    </>
  );

  const mobileNavCollapsed = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",
        // boxShadow: "3px -7px 12px 12px black",
      }}
    >
      <div style={{ flex: 1, color: "white" }}></div>
      <h1 style={{ flex: 1, color: "white" }}>Manager</h1>
      <div style={{ flex: 1 }}>
        <img
          onClick={() => toggleNavExtended(!navExtended)}
          src={toggleNav}
          alt="Toggle Mobile Nav Bar"
          style={{ height: "50px" }}
        />
      </div>
    </div>
  );

  const mobileNavExpanded = (
    <div
      style={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1 style={{ flex: 1, color: "white" }}>Manager</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
          justifyContent: "space-evenly",
        }}
      >
        <ManagerNavBarLinks
          exact
          children={"Produce"}
          to={`${match.url}`}
          mobile={"true"}
          activeStyle={{
            color: "green",
          }}
        />
        <ManagerNavBarLinks
          children={"Comments"}
          to={`${match.url}/comments`}
          mobile={"true"}
          activeStyle={{
            color: "red",
          }}
        />

        <ManagerNavBarLinks
          children={"Sales"}
          to={`${match.url}/sales`}
          mobile={"true"}
          activeStyle={{
            color: "yellow",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ManagerNavButton
          onClick={managerLogout}
          mobile={"true"}
          // style={{
          //   background: "none",
          //   border: "none",
          //   display: "flex",
          //   alignItems: "center",
          //   width: "120px",
          //   height: "50px",
          //   justifyContent: "space-between",
          //   color: "white",
          //   fontSize: "1em",
          //   fontFamily: "inherit",
          // }}
        >
          <img src={signOut} style={{ height: "100%" }} alt="Sign Out Icon" />
          Sign Out
        </ManagerNavButton>

        {/* <button
          onClick={managerLogout}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            width: "120px",
            height: "50px",
            justifyContent: "space-between",
            color: "white",
            fontSize: "1em",
            fontFamily: "inherit",
          }}
        >
          <img src={signOut} style={{ height: "100%" }} />
          Sign Out
        </button> */}
        <img
          onClick={() => toggleNavExtended(!navExtended)}
          src={toggleNav}
          alt="Toggle Mobile Nav Bar"
          style={{ height: "50px", transform: "rotate(180deg)" }}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <ManagerMobileWrapper
        style={{
          flex: navExtended ? 2 : 0.2,
          // boxShadow: "3px -7px 12px 12px black",
          display: "flex",
          alignItems: "center",
          background: "black",
          borderRadius: "0px 0px 10px 10px",
        }}
        children={navExtended ? mobileNavExpanded : mobileNavCollapsed}
      />
    );
  } else {
    return (
      <ManagerHeader
        navExtended={navExtended}
        children={navExtended ? deskTopNavExtended : deskTopNavCollapsed}
      />
    );
  }
};

export default connect(null, { managerLogout })(ManagerNav);
