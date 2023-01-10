import React, { useEffect } from 'react';
import auth from '../../utils/auth';

function NoBids() {
	useEffect(() => {
        document.title = 'DCI Vendor Portal | No Bids';
    }, []);
	return (
		<iframe
			height="100%"
			width="100%"
			frameBorder="0"
			scrolling="auto"
			style={{ height: "93vh" }}
			title="noBids"
			id="noBids"
			src={`https://creatorapp.zohopublic.com/directcomponents/crm-integrations/report-embed/RFQ_No_Bid_NEW/FfGWaP5RqmxZdyMy6KdqWgNdWeqMYNeO6TsgXz3dhhaKBy1wAgy3RATeW5KYDxnwu94YGSgMVSnzWE3VdADnEzD5VY4O5GmjyOQs?Vendor.ID=${auth.getProfile().creator_account_id}`}
		></iframe>
	);
}

export default NoBids;
