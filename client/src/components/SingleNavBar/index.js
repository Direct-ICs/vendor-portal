import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import './style.css';

function SingleNavBar({ text, pdf, acceptDecline }) {
  const whatId = useParams();

  const navigate = useNavigate(); 
  const routeChange = () => {  
      navigate(-1);
  }
  
  async function downloadFile (e) {
		e.preventDefault();

    try {
      const link = document.createElement('a');
      link.href = pdf;
      link.download = `${Object.keys(whatId).includes("billid") ? `BILL-${whatId.billid}` : `ORDER-${whatId.orderid}`}.pdf`;
      link.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
      return;
    }
	}

  return (
    <div className="single-nav-container">
      <div onClick={routeChange} className="back-link link flex">
        <AiOutlineLeft />
        <div>{text}</div>
      </div>
      <div className="flex btn-group">
        <div className="box-border btn" id="download-pdf" onClick={downloadFile}>
          <AiOutlineDownload />
        </div>
        {/* PO accept or decline - only include for POs that are open */}
        {acceptDecline && (
          <>
            <div
              className={`btn box-border`}
              id="accept"
              //onClick={data && openRmaModal}
            >
              Accept
            </div>
            <div
              className={`btn box-border`}
              id="decline"
              //onClick={data && openRmaModal}
            >
              Decline
            </div>
          </>
        )}

        
        {/* <div className="box-border btn" id="print-pdf" onClick={downloadOrPrint}>
          <BsPrinter />
        </div> */}
      </div>
    </div>
  );
}

export default SingleNavBar;
