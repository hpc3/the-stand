import React, { useState, useEffect, useRef } from "react";
import { managerLogin, validToken } from "../../actions/managerActions";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import axios from "axios";

import styled from "styled-components";

import usernameIcon from "../../images/72ppi/username.png";
import passwordIcon from "../../images/72ppi/password.png";

const ManagerLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
`;

const ManagerLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: white;
  height: 50%;
  width: 50%;
  border-radius: 1em;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  padding: 1em;
  max-width: 600px;

  -webkit-box-shadow: 3px 4px 10px -1px rgba(0, 0, 0, 0.58);
  box-shadow: 3px 4px 10px -1px rgba(0, 0, 0, 0.58);

  @media (max-width: 750px) {
    width: 80%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 50%;
  justify-content: space-between;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:focus {
    width: 60%;
  }

  @media (max-width: 750px) {
    width: 80%;
  }
`;

const StyledInput = styled.input`
  border-radius: 20px;
  flex: 0.9;
  height: 40px;
  font: inherit;

  font-size: 1.5em;
  padding-left: 15px;
  -webkit-box-shadow: 3px 4px 10px -1px rgba(0, 0, 0, 0.58);
  box-shadow: 3px 4px 10px -5px rgba(0, 0, 0, 0.58);

  &:focus {
    outline: none;
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const StyledSubmitButton = styled.button`
  height: 40px;
  width: 100px;
  align-self: center;
  border-radius: 10px;
  font-size: 1em;
  color: black;
  background: white;
  -webkit-box-shadow: 3px 4px 10px -1px rgba(0, 0, 0, 0.58);
  box-shadow: 3px 4px 10px -5px rgba(0, 0, 0, 0.58);

  &:hover {
    background: black;
    color: white;
  }
`;

const ManagerLogin = ({ loading, error, managerLogin, validToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInput = useRef(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      await axios({
        method: "POST",
        url: "/auth/verifyToken",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(() => {
          validToken();
        })
        .catch((e) => console.log(e));
    };

    checkLoginStatus();
  }, [validToken]);

  const loginHandler = (e) => {
    e.preventDefault();

    managerLogin(username, password);
    setUsername("");
    setPassword("");
  };

  const loginForm = (
    <StyledForm onSubmit={loginHandler}>
      <StyledInputWrapper>
        <div style={{ marginRight: "10px", flex: 0.1 }}>
          <img
            src={usernameIcon}
            style={{ height: "40px", width: "40px" }}
            alt="Username Icon"
          />
        </div>

        <StyledInput
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          ref={usernameInput}
        />
      </StyledInputWrapper>

      <StyledInputWrapper>
        <div style={{ marginRight: "10px", flex: 0.1 }}>
          <img
            src={passwordIcon}
            style={{ height: "40px", width: "40px" }}
            alt="Password Icon"
          />
        </div>

        <StyledInput
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </StyledInputWrapper>

      <StyledSubmitButton type="submit">Log In</StyledSubmitButton>
    </StyledForm>
  );

  return (
    <ManagerLoginContainer>
      <ManagerLoginWrapper>
        <h2 style={{ fontSize: "2em", fontFamily: "inherit" }}>
          Manager Login
        </h2>

        {error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : (
          <></>
        )}

        {loading ? <ReactLoading type="balls" color="black" /> : loginForm}
      </ManagerLoginWrapper>
    </ManagerLoginContainer>
  );
};

const mapStateToProps = (state) => ({
  loading: state.manager.loading,
  error: state.manager.error,
});

export default connect(mapStateToProps, { managerLogin, validToken })(
  ManagerLogin
);
