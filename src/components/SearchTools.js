  
import React from 'react';

import '../componentStyles/SearchTools.css'
import '../componentStyles/font.css'

const SearchTools = (props) => {

    return(
        <div className="sort_container">
            <div className="sort_selector">
                <label htmlFor="sort_select">Sort Produce By: </label>
                <select id="sort_select" onChange={props.sortList}>
                    <option value='a-z'>Name (A-Z)</option>
                    <option value='z-a'>Name (Z-A)</option>
                    <option value='h-l'>Price (high-low)</option>
                    <option value='l-h'>Price (low-high)</option>
                </select>
            </div>
        </div>
    )

}


export default SearchTools;