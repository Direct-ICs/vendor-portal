import React, {useEffect } from 'react';
import auth from '../../utils/auth';

function PendingBids() {
	useEffect(() => {
        document.title = 'DCI Vendor Portal | Pending Bids';
    }, []);
	return (
		<iframe
			height="100%"
			width="100%"
			frameBorder="0"
			scrolling="auto"
			style={{ height: "93vh" }}
			title="pendingBids"
			id="pendingBids"
			src={`https://creatorapp.zohopublic.com/directcomponents/crm-integrations/report-embed/RFQ_Pending_NEW/NDYFU8Us4Xdu9qrwCNK2FugWdxnnUkVOvPHOeB2jQyA4bsHk1EJvA1gPNNe5NTsDUxJ8U92nb2WbUGsR2xh47YHxqhT8g9YVWMf1?Vendor.ID=${auth.getProfile().creator_account_id}`}
		></iframe>
	);
}

export default PendingBids;
