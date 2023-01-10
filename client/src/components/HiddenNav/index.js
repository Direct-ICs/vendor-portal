import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

function HiddenNav ({ setShowNav, showNav }) {
    const [style, setStyle] = useState({})

     useEffect(() => {
        if (showNav) {
            setStyle('200px')
        } else {
            setStyle('0px')
        }
     }, [showNav]);
     
    return (
        <div className='hidden-nav'>
            <div>
                <AiOutlineMenu 
                    className='icon'
                    style={{ cursor: 'pointer', fontSize: '1.5rem', marginLeft: '25px', marginTop: '12px', left: style, position: 'absolute' }}
                    onClick={(e) => setShowNav(!showNav)} />
            </div>
        </div>
    )
}

export default HiddenNav;