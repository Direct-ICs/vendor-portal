import React from 'react';

function SignOnHeader () {
    return (
        // <div
        //     style={{
        //         margin: '20px 15px 0 15px',
        //         borderBottom: '1px lightgrey solid',
        //         paddingBottom: '15px',
        //     }}
        // >
        //     {/* <img src={process.env.PUBLIC_URL+ '/BlackPanels1.jpg'} alt='Company logo' /> */}
        //     <h2 style={{ fontWeight: '600', textAlign: 'center' }}>Customer Portal</h2>
        // </div>
        <div style={{ position: 'relative'}}>
        <img id='hero-img' src={process.env.PUBLIC_URL+ '/PolygonBG.jpg'} alt='Company logo' />
		<span id="hero-text">
			Customer Portal
		</span>
        </div>
    )
}

export default SignOnHeader;