import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SingleNavBar from '../../components/SingleNavBar';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';
import axios from "axios";
import CommentSection from '../../components/CommentSection';
import './style.css';

let detailNum;

function SingleDetailed () {
    // /page/:whatId
    const location = useLocation();
    const page = location.pathname.split("/")[1];
    const whatId = location.pathname.split("/")[2];

    const [loading, setLoading] = useState(true);
    const [detail, setDetails] = useState({});
    const [pdf, setPdf] = useState();
    const [printPdf, setPrintPdf] = useState();
    const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
        setLoading(false);
	};

    useEffect(() => {
        // get item from session storage that was already saved
        const details = JSON.parse(sessionStorage.getItem(page + ""))
                .filter(item => {
                    const search = page === "orders" ? item.purchaseorder_id : item.bill_id;
                    return search === whatId;
                })[0];

        setDetails(details);
        getPdf();

        // Get number for the detailed page
        try {
            detailNum = (page === "orders" ? details.purchaseorder_number : details.bill_number);
        } catch (TypeError) {
            detailNum = ''
        }
    }, []);

    useEffect(() => {
        document.title = 'DCI Vendor Portal | ' + detailNum;
    }, []);

  async function getPdf () {
    if (!pdf) {
        axios.get(`/api${location.pathname}/pdf`,
        {
            responseType: 'blob',
        })
        .then((data) => {
            const url = URL.createObjectURL(data.data);
            setPdf(url);
        })
        .catch((err) => {
            
        });
    } else {
        console.log("already loaded pdf!");
    }
  }

    if (!detailNum) {
        return (<NotFound />)
      }

    // async function getOrderDetails () {
    //     const response = await fetch(`/api/orders/${orderid}`, {
    //         method: 'GET'
    //     });
    //     const { data } = await response.json();
    //     if (response.ok) {
    //         console.log(data);
    //         setOrder(data.purchaseorder);
    //         // save packages and bills to session storage for faster parsing on page
    //         const so = data.purchaseorder.salesorders;
    //         const orders = JSON.parse(sessionStorage.getItem('orders')).map(order => {
    //             if (order.purchaseorder_id === orderid)
    //             {
    //                 order.salesorders = so;
    //             }
    //             return order;
    //         });
    //         sessionStorage.setItem('orders', JSON.stringify(orders));
    //     } else {
    //         // console.error(data.message);
    //     }
    // }
    
    return (
       <>{loading && 
            <Loading />}
        <div className={`single-detail-container ${loading && 'hidden'}`}>
            <SingleNavBar text='Back' pdf={pdf} acceptDecline={page === "orders" && detail.status === "open"} />
            <div className='single-detail-content'>
                <CommentSection />
                <div className={`border pdf-view-container`}>
                    <Document
                        file={pdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page
                                scale={100/62}
                                pageNumber={pageNumber} />
                    </Document>
                </div>
            </div>
            {/* {printPdf && (
                <iframe src={printPdf}>#document</iframe>
            )} */}
        </div>
    </>);
}

export default SingleDetailed;