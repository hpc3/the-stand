import React from 'react';
import styled from 'styled-components';

// import '../componentStyles/SearchTools.css'


const SearchToolsWrapper = styled.div`


    margin: 2em;

`

const Select = styled.select`

    border-radius: .1em;

`


const SearchTools = ({sortList}) => {

    return(
        <SearchToolsWrapper>
                <label htmlFor="sort_select">Sort Produce By: </label>
                <Select id="sort_select" onChange={sortList}>
                    <option value='a-z'>Name (A-Z)</option>
                    <option value='z-a'>Name (Z-A)</option>
                    <option value='h-l'>Price (high-low)</option>
                    <option value='l-h'>Price (low-high)</option>
                </Select>
        </SearchToolsWrapper>
    )

}


export default SearchTools;