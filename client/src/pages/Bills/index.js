import React, { useState, useEffect } from 'react';
import BillList from '../../components/BillList';
import { IoChevronUpOutline, IoChevronDownOutline } from 'react-icons/io5';
import Loading from '../../components/Loading';
import ListFilter from '../../components/ListFilter';
import { gatherbillData } from '../../utils/Data_Grabber';
import './style.css';

function Bills () {
    useEffect(() => {
        document.title = 'DCI Vendor Portal | Bills';
    }, []);

    const [bills, setbills] = useState();
    const [loading, setLoading] = useState(true);
    const [currentFilter, setFilter] = useState({display: "All Invoices", api: "All"});

    const headers = ['Invoice #', 'Date', 'Total', 'Status'];

    // Filtering the bills
    const [currentSort, setCurrentSort] = useState({ filter: "" });
    const handleFilterClick = (event) => {
        const toFilter = event.target.id ? event.target.id : currentSort.filter;
        const direction = currentSort.filter === toFilter 
                        ? (currentSort.direction === 'asc' ? 'desc' : 'asc') 
                        : currentSort.direction;
        setCurrentSort({ filter: toFilter, direction });

        const setName = (filterName) => {
            if (filterName === 'Invoice #') return {whatToFiler: 'bill_num', sub: 4}
            else return {whatToFilter: filterName, sub: 0}
        }

        setbills(filterData(setName(toFilter.toLowerCase()), direction, bills));
    }

    // Filter data based on data sent, and 'whatToFilter' which is a key in an obj
    const filterData = ({whatToFilter, sub}, directionToFilter, data) => {
        const filteredData = data.sort((a, b) => {
            const dataNumA = typeof a[whatToFilter] === 'string' 
                            ? a[whatToFilter].substring(sub) 
                            : a[whatToFilter];
            const dataNumB = typeof b[whatToFilter] === 'string' 
                            ? b[whatToFilter].substring(sub) 
                            : b[whatToFilter];
            return (directionToFilter === 'asc' 
                    ? (dataNumA < dataNumB) 
                        ? 1 
                        : -1 
                    : -1
            );
        });
        return filteredData;
    }

    const clearFilter = () => {
        setbills(filterData({whatToFilter: "Date", sub: 0}, 'des', bills));
        setCurrentSort({ filter: "" });
    }

    const doSomethingWithFilter = (whatFilter) => {
        setLoading(true);
        gatherbillData(whatFilter.api)
        .then((bill) => {
            setbills(JSON.parse(bill));
            setFilter(whatFilter);
            setLoading(false);
        })
    }

    // Load bills
    useEffect(() => {
        try {
            setbills(JSON.parse(sessionStorage.getItem('bills')));
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div className='bills-container'>
            <h2 className='list-header'>Invoices</h2>
            <ListFilter filterList={doSomethingWithFilter} 
                filters={[
                    {
                        display: "All Invoices",
                        api: "All"
                    },
                    {
                        display: "Overdue Invoices",
                        api: "Overdue"
                    },
                    {
                        display: "Paid Invoices",
                        api: "Paid"
                    },
                    {
                        display: "Partially Paid Invoices",
                        api: "PartiallyPaid"
                    }
                ]} 
                current={currentFilter} />
                {currentSort.filter !== "" && (
                    <div id="currentSort"
                        onClick={clearFilter}>
                            <span id="close">Sort: </span>
                            <span>{currentSort.filter}</span>
                    </div>
                )}
            {loading 
            ? <Loading />
            : 
            (<>
            <div className='table-wrapper'>
                <table className='table'>
                    {/* Table header */}
                    <thead>
                        <tr>
                            {/* Map the heading categories, showing graphical input for filter */}
                            {headers.map(item => (
                                (item !== 'Reference #' 
                                ? 
                                (<th className={`filter ${currentSort.filter === item && 'filtered'}`} 
                                    id={item} 
                                    key={item}
                                    onClick={handleFilterClick}
                                >
                                    {item} {currentSort.filter === item ? 
                                        (currentSort.direction === 'asc' ? <IoChevronUpOutline style={{ color: 'black' }} /> : <IoChevronDownOutline style={{ color: 'black' }} />) 
                                            : <></>}
                                </th>) 
                                :
                                (<th className='' key={item}>{item}</th>)
                            )))}
                        </tr>
                    </thead>
                    
                    {/* Table body */}
                    <tbody>
                        {/* list of bills */}
                        {( bills && ( bills.length > 0 ) ) && bills.map(bill => (
                            <BillList key={bill.bill_id} bill={bill} />
                        ))}
                    </tbody>
                </table>
            </div>

            {(!bills || bills.length === 0) 
                &&
                (
                    <div className='no-data'>
                        There are no invoices for your account
                    </div>
                )}
            </>)}
        </div>
    );
};

export default Bills;