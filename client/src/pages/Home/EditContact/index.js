import React, { useState } from 'react';
import Auth from '../../../utils/auth';
import { toast } from 'react-toastify';

function EditContact ({ setEditModal, user, setUser, setAccount, account }) {
    const [formState, setFormState] = useState({
		first: user.first_name,
		last: user.last_name,
		work: user.phone,
		mobile: user.mobile,
		department: user.department
	});

  	function handleValueChange (e) {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
  	};

    function handleModalClose (e) {
		(e.target.className === 'modal-background' || 
		 e.target.className.includes('close')) 
				&& setEditModal(false);
	}

    async function handleFormSubmit (e) {
        e.preventDefault();

        // check to see if the values are updated
        const updateBody = {};
        (formState.first !== user.first_name && formState.first !== '') && (updateBody.first_name = formState.first);
        (formState.last !== user.last_name && formState.last !== '') && (updateBody.last_name = formState.last);
        (formState.work !== user.phone) && (updateBody.phone = formState.work);
        (formState.mobile !== user.mobile) && (updateBody.mobile = formState.mobile);
        (formState.department !== user.department) && (updateBody.department = formState.department);

        if (Object.keys(updateBody).length > 0) {
            updateBody.contact_id = Auth.getProfile().books_account_id;

            const response = await fetch('/api/users/contact/' + user.contact_person_id, {
                method: 'put',
                body: JSON.stringify(updateBody),
                headers: {
                    "Content-Type": 'application/json;charset=UTF-8'
                },
            })

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('user', JSON.stringify(data.data.contact_person));
                const updatedContacts = JSON.parse(sessionStorage.getItem('account')).contact_persons.map((person) => {
                    if (person.contact_person_id === data.data.contact_person.contact_person_id)
                        person = data.data.contact_person;
                    return person;
                });
                const newAccount = {...account, contact_persons: updatedContacts }
                sessionStorage.setItem('account', JSON.stringify(newAccount))
                setAccount(newAccount);
                
                setUser(data.data.contact_person);
                setEditModal(false);
                toast.success('Successfully updated the profile!');
            } else {
               toast.error('There was an error editing the information');
            }
        } else {
            setEditModal(false);
            toast.warning('No information was changed');
        }
    }

    return (
        <div className="modal-background" onClick={handleModalClose}>
			<div
				className="modal-container"
				style={{
					width: '50%',
					overflow: 'auto',
					maxWidth: '400px',
					height: 'fit-content',
				}}
			>
                <div className="modal-head">Edit Contact</div>
				<div className="modal-body">
                    {/* Errors here */}

                    {/* Form */}
                    <form className='modal-form' id='edit-user-form' onSubmit={handleFormSubmit}>
                        <label name='first'>First Name</label>
                        <input type='text' name='first' value={formState['first']} onChange={handleValueChange} />
                        <label name='last'>Last Name</label>
                        <input type='text' name='last' value={formState['last']} onChange={handleValueChange} />

                        <label name='work'>Work Phone</label>
                        <input type='tel' name='work'  value={formState['work']} onChange={handleValueChange} />

                        <label name='mobile'>Mobile Number</label>
                        <input type='tel' name='mobile' value={formState['mobile']} onChange={handleValueChange} />

                        <label name='department'>Department</label>
                        <input type='text' name='department' value={formState['department']} onChange={handleValueChange} />

                        {/* Footer */}
                        <div className='modal-footer'>
							<button className='modal-btn submit' type='submit'>Update Contact</button>
							<button className='modal-btn close' onClick={handleModalClose}>Cancel</button>
						</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditContact;