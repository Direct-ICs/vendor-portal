import React, { useEffect } from 'react';
import auth from '../../utils/auth';

function Bids() {
	useEffect(() => {
        document.title = 'DCI Vendor Portal | Bids';
    }, []);
	return (
		<iframe
			height="100%"
			width="100%"
			frameBorder="0"
			scrolling="auto"
			style={{ height: "93vh" }}
			title="bids"
			id="bids"
			src={`https://creatorapp.zohopublic.com/directcomponents/crm-integrations/report-embed/RFQ_Bid_NEW/B6he4FbaBnZyuZrPKBr0UVS346KFuWusq3m61P9pbQBUDUJSJGYnvqaFGA3G8b6SXEFk1VxC5EJk2P6gV3PXTM5hqSmUtSY9dWa0?Vendor.ID=${auth.getProfile().creator_account_id}`}
		></iframe>
	);
}

export default Bids;
