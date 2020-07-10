import React from 'react';
import styled from 'styled-components';

import ProduceInput from './ProduceInput';


const ProduceControlWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 10vh;
    justify-content: space-evenly;

`


const ProduceButtonWrapper = styled.div`

    display: flex;
    justify-content: space-evenly;
    height: 30%;
    width: 100%;

`


const ProduceButton = styled.button`

    background-color: ${props => props.bgColor};
    color: white;
    border: none;
    border-radius: 5px;
    width: 25%;

    touch-action: manipulation;
`


const ProduceControls = ({changeHandler, pushQuantityChange}) => {


    return(


        <ProduceControlWrapper>


            <ProduceButtonWrapper>
                <ProduceButton bgColor="red"  onClick={() => changeHandler(-1)}> - </ProduceButton>
                <ProduceButton bgColor="green" onClick={() => changeHandler(1)}> + </ProduceButton>
            </ProduceButtonWrapper>

            <ProduceInput changeHandler={changeHandler}/>

            <button onClick={pushQuantityChange} >Push</button>

        </ProduceControlWrapper>
    );


}


export default ProduceControls;