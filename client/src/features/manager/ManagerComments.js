import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { archiveComment } from "../../actions/commentActions";

import { renderDateString } from "./functions";

import replyToIcon from "../../images/replyToIcon.png";
import previousIcon from "../../images/nav-collapse.png";
import nextIcon from "../../images/nav-expand.png";
import archiveCommentImage from "../../images/archive-comment.png";

import Dropdown from "../../components/Dropdown";

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  justify-content: flex-start;
  width: 90%;
  height: 80vh;
`;

const CommentsNavigationButtons = styled.button`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
  width: 100px;
  font: inherit;

  background: none;
  border: none;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 800px;
  align-self: center;
  padding: 1em;
  border-radius: 10px;
  /* border: solid black 2px; */
  -webkit-box-shadow: 5px 7px 5px -4px #000000;
  box-shadow: 5px 7px 5px -4px #000000;

  background: #e3e3e3;
  width: 100%;
  margin: 5px 0;
  height: 20%;

  font-size: 0.9em;
`;

const ArchiveCommentButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  background: black;
  color: white;
  border-radius: 10px;
  padding: 5px;

  width: 140px;
  height: 40px;

  font-family: inherit;
  font-size: 1.1em;
  justify-content: space-around;
  &:hover {
    cursor: pointer;
  }
`;

const CommentData = styled.span`
  margin: 0;
`;

const ManagerComments = ({ comments, archiveComment }) => {
  const [page, setPage] = useState(0);

  const handleDropdownItemSelect = (actionType, value) => {
    switch (actionType) {
      case "email":
        window.location.href = "mailto:" + value;
        break;
      case "archive":
        archiveComment(value);
        break;
      default:
        break;
    }
  };

  const commnetActionObject = [
    {
      title: "Archive",
      type: "archive",
      img: archiveCommentImage,
    },
    {
      title: "Reply",
      type: "email",
    },
  ];

  const renderComments = () => {
    let arrayOfCommentComponents = [];

    let startingPosition = page * 4;

    const endingPositon = startingPosition + 4;

    for (
      startingPosition;
      startingPosition < endingPositon;
      startingPosition++
    ) {
      if (
        comments[startingPosition] !== null &&
        comments[startingPosition] !== undefined
      ) {
        const tempCommentHolder = comments[startingPosition];
        arrayOfCommentComponents.push(
          <Comment key={tempCommentHolder._id}>
            <div
              style={{
                flex: 1,
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <p>
                Name : <CommentData>{tempCommentHolder.name}</CommentData>
              </p>
              <Dropdown
                children={"v Actions"}
                listItemsObject={
                  tempCommentHolder.email
                    ? [
                        {
                          title: "Archive",
                          type: "archive",
                          img: archiveCommentImage,
                        },
                        {
                          title: "Reply",
                          type: "email",
                        },
                      ]
                    : [
                        {
                          title: "Archive",
                          type: "archive",
                          img: archiveCommentImage,
                        },
                      ]
                }
                optionSelectCallback={handleDropdownItemSelect}
                identifyingData={
                  tempCommentHolder.email
                    ? {
                        email: tempCommentHolder.email,
                        id: tempCommentHolder._id,
                      }
                    : {
                        id: tempCommentHolder._id,
                      }
                }
              />
            </div>
            {tempCommentHolder.email ? (
              <div style={{ flex: 1 }}>
                <p>
                  Email:{" "}
                  <a href={"mailto:" + tempCommentHolder.email}>
                    <CommentData>{tempCommentHolder.email}</CommentData>
                  </a>
                </p>
              </div>
            ) : null}
            <div style={{ flex: 3 }}>
              <p>
                Comment: <CommentData>{tempCommentHolder.message}</CommentData>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: 1 }}>
                {/* Date Goes Here */}
                <p>
                  Recieved:{" "}
                  {renderDateString(
                    new Date(tempCommentHolder.dateSubmitted),
                    "/",
                    true
                  )}
                </p>
              </div>
              <div
                style={{
                  flex: 0.7,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></div>
            </div>
          </Comment>
        );
      }
    }

    return arrayOfCommentComponents;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "space-evenly",
        height: "100%",
        width: "100%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Comments</h1>

      <CommentsWrapper>{renderComments()}</CommentsWrapper>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          alignSelf: "center",
        }}
      >
        {page !== 0 ? (
          <CommentsNavigationButtons
            reverse={true}
            onClick={() => setPage(page - 1)}
          >
            Back{" "}
            <img
              src={previousIcon}
              alt="Back page icon"
              style={{ height: "100%" }}
            />
          </CommentsNavigationButtons>
        ) : (
          <CommentsNavigationButtons
            style={{ background: "none", border: "none" }}
            disabled={true}
          />
        )}

        <p>
          {page + 1} / {Math.ceil(comments.length / 4)}
        </p>

        {Math.ceil(comments.length / 4) !== page + 1 ? (
          <CommentsNavigationButtons onClick={() => setPage(page + 1)}>
            Next{" "}
            <img
              src={nextIcon}
              alt="Next page icon"
              style={{ height: "100%" }}
            />
          </CommentsNavigationButtons>
        ) : (
          <CommentsNavigationButtons
            style={{ background: "none", border: "none" }}
            disabled={true}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps, { archiveComment })(ManagerComments);
