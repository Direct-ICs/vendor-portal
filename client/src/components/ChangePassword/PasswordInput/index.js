import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function PasswordInput (props) {
    const [peekPassword, setPeekPassword] = useState(false);

    return (
        <div className='flex login-form-input' style={{ marginBottom: '10px', width: '100%' }}>
            <input
                type={`${peekPassword ? 'text' : 'password'}`}
                name={props.name}
                value={props.password}
                onChange={props.handleChange}
                disabled={props.disabled}
                required
            />
            <div 
                onClick={(e) => setPeekPassword(!peekPassword)}
                style={{ 
                    cursor: 'pointer',
                    paddingRight: '5px',
                    fontSize: '1.25rem'
                }}>
                {peekPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
            </div>
        </div>
    )
}

export default PasswordInput;