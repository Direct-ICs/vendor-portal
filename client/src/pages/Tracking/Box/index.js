import React from 'react';
import { formatDate } from '../../../utils/helpers';

function Box ({tracking, title, background}) {

    return (
        <div className='box-container'>
            <div className='box-title' style={{"background": background}}>
                {title}
            </div>
            <div className='box-content'>
                {tracking.length > 0 
                ?
                    tracking.map((track) => (
                        <div className='indiv-tracking' key={track.purchaseorder_number}>
                            <div className='content-left'>
                                <span>{track.purchaseorder_number}</span>
                                <span className='sub-content'>{formatDate(track.date)}</span>
                            </div>
                            <table className='content-right'>
                                <tbody>
                            {track.packages.map(pkg => (
                                <tr key={pkg.package_number}>
                                    <td style={{ alignItems: "flex-start", width: "40%" }}>
                                        {pkg.package_number}<br />
                                        <span className='sub-content'>{formatDate(pkg.shipment_date)}</span>
                                    </td>
                                    <td style={{ display: "flex", flexDirection:"column", alignItems: "self-end" }}>
                                        <span>{pkg.tracking_number}</span>
                                        <span className='sub-content'>{pkg.delivery_method}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </div>
                    ))
                :
                    <div style={{textAlign: "center", paddingTop: "10px"}}>No shipments found</div>
                }
            </div>
            <div className='box-footer'>

            </div>
        </div>
    );
}

export default Box;