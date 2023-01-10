import React, { useState } from 'react';
import './style.css';
import { AiOutlineCaretDown } from 'react-icons/ai';

function ListFilter({ filterList, filters, current }) {
    const [currentFilter, setFilter] = useState(current);
    const [showList, setShow] = useState(false);

    function showDropDown () {
        setShow(!showList);
    }

    function changeActiveFilter (e, i) {
        const selectedFilter = e.target.id;
        if (currentFilter.display !== selectedFilter) {
            setFilter(filters[i]);
            filterList(filters[i]);
        }
    }

    return (
        <div className='filter-container' onClick={showDropDown}>
            <div id='filter-words'>
                <small id="helper">Show: </small>
                <span id="current-word">{currentFilter.display}</span>
                <span id="down-arrow"><AiOutlineCaretDown /></span>
            </div>
            <div id="dropdown" className={`${showList && 'show'}`}>
                {filters.map((filter, index) => (
                    <span 
                        className={`${currentFilter !== filter.display ? 'activeFilter' : 'disabledFilter' }`}
                        onClick={(e) => changeActiveFilter(e, index)}
                        key={filter.api}
                        id={filter.display}
                        >
                            {filter.display}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ListFilter;