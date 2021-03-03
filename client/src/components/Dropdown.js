import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const DropDownContainer = styled.div`
  width: 10em;
  /* margin: 0 auto; */
  cursor: pointer;
`;

const DropdownHeader = styled.div`
  padding: 0.4em 2em 0.4em 1em;
  background-color: black;
  color: white;
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: white;
  border: 2px solid black;
  width: 10em;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  list-style: none;
  cursor: pointer;
  padding: 5px;
  border-bottom: 2px solid black;

  color: ${(props) => (props.isActive ? "red" : "black")};

  &:hover {
    color: white;
    background: black;
  }
`;

const ListItemImage = styled.img`
  height: 35px;
`;

/*


listItems = [
    {title: some String, img: imgObj/refernce/thing?}
]


onclick of a listItem change the chartType of MaragerSales

*/

const Dropdown = ({
  listItemsObject,
  optionSelectCallback,
  children,
  activePeriod,
  identifyingData,
}) => {
  const node = useRef();

  // something that conteints the email and comment ID

  // {
  //   email: "email",
  //   id: "id"
  // }

  const [isOpen, toggleOpen] = useState(false);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    toggleOpen(false);
  };

  const handleChange = (selectedValue) => {
    if (identifyingData) {
      switch (selectedValue) {
        case "email":
          optionSelectCallback(selectedValue, identifyingData.email);
          toggleOpen(false);
          break;
        case "archive":
          optionSelectCallback(selectedValue, identifyingData.id);
          toggleOpen(false);
          break;
        default:
          break;
      }
    } else {
      toggleOpen(false);
      optionSelectCallback(selectedValue);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <DropDownContainer ref={node}>
      <DropdownHeader onClick={(e) => toggleOpen((isOpen) => !isOpen)}>
        {children}
      </DropdownHeader>
      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1 }}>
          <DropDownList>
            {listItemsObject.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  onClick={() => handleChange(item.type)}
                  isActive={activePeriod === item.type}
                  style={{
                    justifyContent: item.img ? "space-between " : "flex-start",
                  }}
                >
                  {item.img && (
                    <ListItemImage
                      src={item.img}
                      alt="Select Time Period Icon"
                    />
                  )}

                  {item.title}
                </ListItem>
              );
            })}
          </DropDownList>
        </div>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
