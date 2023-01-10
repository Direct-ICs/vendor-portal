import React, { useState } from 'react';
import { toast } from 'react-toastify';

const account = JSON.parse(sessionStorage.getItem('account'));

function AddContactModal({ setModalOpen, setAccount }) {
	const [formState, setFormState] = useState({
		first: '',
		last: '',
		email: '',
		work: '',
		mobile: '',
		department: ''
	});

	const [submitError, setSubmitError] = useState('');

  	function handleValueChange (e) {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
  	};

	function handleFormSubmit (event) {
		event.preventDefault();

		async function gatherDataForSend () {
			let data = {
				contact_id: account.contact_id,
				first_name: formState.first,
				last_name: formState.last,
				email: formState.email,
				phone: formState.work
			}
			formState.mobile !== '' && (data.mobile = formState.mobile);
			formState.department !== '' && (data.department = formState.department);

			return data;
		}

		async function createNewContact (dataToSend) {
			const response = await fetch('/api/users/contact', {
				method: 'post',
				body: JSON.stringify(dataToSend),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			})
			const data = await response.json();
			if (response.ok) {
				// successfully added contact
				const updatedContacts = {...account, contact_persons: [...account.contact_persons, data.data.contact_person]}
				sessionStorage.setItem('account', JSON.stringify(updatedContacts));
				setAccount(updatedContacts);
				setModalOpen(false);
				toast.success(`Successfully added ${formState.first} ${formState.last} to account!`)
			} else {
				// error adding contact
				setSubmitError(data.message.message);
			}
		}

		(formState.first && formState.last && formState.email && formState.work) !== ''
		? gatherDataForSend()
			.then((data) => createNewContact(data))
		: console.log('errors');
	}

	function handleModalClose (e) {
		(e.target.className === 'modal-background' || 
		 e.target.className.includes('close')) 
				&& setModalOpen(false);
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
                <div className="modal-head">Add New Contact</div>
				<div className="modal-body">
					{submitError && (
						<div id="login-error"
							className='error-display'>
							{submitError}
						</div>
					)}
					<form className='modal-form' id='add-user-form' onSubmit={handleFormSubmit}>
						<label name='first'>
							First Name<span style={{ color: 'red'}}> *</span>
						</label>
						<input type='text' id='first' name='first' required onChange={handleValueChange} value={formState['first']} />

						<label name='last'>
							Last Name<span style={{ color: 'red'}}> *</span>
						</label>
						<input type='text' id='last' name='last' required onChange={handleValueChange} value={formState['last']} />

						<label name='email'>
							Email<span style={{ color: 'red'}}> *</span>
						</label>
						<input type='email' id='email' name='email' required onChange={handleValueChange} value={formState['email']} />

						<label name='work'>
							Work Phone<span style={{ color: 'red'}}> *</span>
						</label>
						<input type='tel' required id='work' name='work' onChange={handleValueChange} value={formState['work']} />

						<label name='mobile'>Mobile Phone</label>
						<input type='tel' id='mobile' name='mobile' onChange={handleValueChange} value={formState['mobile']} />

						<label name='department'>Department</label>
						<input type='text' id='department' name='department' onChange={handleValueChange} value={formState['department']} />

						<div className='modal-footer'>
							<button className='modal-btn submit' type='submit'>Add user</button>
							<button className='modal-btn close' onClick={handleModalClose}>Cancel</button>
						</div>
					</form>
				</div>
            </div>
        </div>
    )
}

export default AddContactModal;