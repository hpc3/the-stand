import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import SectionTitle from "./SectionTitle";

const ContactUsWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConactUsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 70%;
  width: 60%;

  justify-content: space-around;

  @media (max-width: 680px) {
    width: 80%;
    padding: 2em 2em;
  }
`;

const FormSubtext = styled.p`
  width: 60%;
  color: white;
  font-size: 0.75em;
  text-align: center;
  align-self: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;

  & input,
  textarea {
    border: 1px solid grey;
    margin-bottom: 10px;
    background-color: white;
    padding-left: 5px;
    font-family: "Lexend Exa", sans-serif;
    font-size: 15px;
  }

  & input {
    height: 20px;
  }
`;

const SubmitButton = styled.button`
  width: 25%;
  align-self: center;
  font-size: 1em;
  color: white;

  border: white solid 2px;
  border-radius: 2px;
  background-color: black;

  &:hover {
    color: black;
    background-color: white;
  }
`;

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

  const pushComment = (e) => {
    e.preventDefault();

    const payload = { name, email, message };

    axios({
      method: "POST",
      url: "/comment",
      data: payload,
    })
      .then((response) => {
        setName("");
        setEmail("");
        setMessage("");
        setRequestStatus(true);
      })
      .catch((err) => {
        setRequestStatus(false);
      });
  };

  return (
    <ContactUsWrapper id="contact-us">
      <ConactUsContent>
        <SectionTitle fontColor="white" style={{borderBottom: '2px solid white'}}>
          Contact Us
        </SectionTitle>

        <FormSubtext>
          {" "}
          We'd love to hear from you. Email is not required but it will add you
          to our email list.
        </FormSubtext>

        {requestStatus !== null ? (
          requestStatus ? (
            <FormSubtext>Thank you for your feedback</FormSubtext>
          ) : (
            <FormSubtext>
              Something went wrong, please try another time
            </FormSubtext>
          )
        ) : (
          ""
        )}

        <StyledForm onSubmit={pushComment}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name*"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="10"
            placeholder="Comment*"
          ></textarea>

          <SubmitButton type="submit">Submit</SubmitButton>
        </StyledForm>
      </ConactUsContent>
    </ContactUsWrapper>
  );
};



export default ContactUs;
