import React, { useState, useEffect } from 'react';
import SignOnHeader from '../SignOn/SignOnHeader';
import Auth from '../../utils/auth';

function SelectCompany () {
    useEffect(() => {
        document.title = 'DCI Vendor Portal | Select Company';
        const accountDeets = Auth.getProfile().account_id.map((account, index) => {
            return { id: account, name: Auth.getProfile().account_name[index], index: index }
        });
        setAccountInfo(accountDeets);
    }, []);

    const [error, setError] = useState({message: [], success: false});
    const [accountInfo, setAccountInfo] = useState([{
        id: "",
        name: "",
        index: 0
    }]);
    const [accountSelected, setAccountSelected] = useState({});

    const submitData = (e) => {
        e.preventDefault();
        if (accountSelected.index !== undefined) {
            setError({message: "", success: true});
            localStorage.setItem("accindex", JSON.stringify(accountSelected.index));
            window.location.replace('/auth/redirect');
        } else {
            setError({ message: "Please select a company to continue", success: false });
        }
    }

    return (<>
        <SignOnHeader />
        <div className="sign-on-wrapper">
            <div className="title">
				<h2 style={{ fontWeight: '400' }}>Select a company for this session</h2>
			</div>
            <div className="error-div" style={{ paddingLeft: 5, paddingRight: 5, textAlign: 'center' }}>
                {error.message.length > 0 && 
                    <span className='error-display flex' style={{ margin: 'auto', color: `${error.success && '#008000'}` }}>{error.message}</span>}
            </div>
            <form style={{ textAlign: 'center'}} onSubmit={submitData}> 
            <div className='account-container form-show'>
                {accountInfo.map((account) => (
                    <div className={`account-name ${accountSelected.id === account.id && 'account-selected'}`}
                        onClick={(e) => setAccountSelected(account)}
                        key={account.id}
                        >
                        <span>
                            {account.name}
                        </span>
                    </div>
                ))}
            </div>
            <button className="login-btn" type='submit'>
                    Select
            </button>
            </form> 
        </div>
        </>
    );
}
export default SelectCompany;