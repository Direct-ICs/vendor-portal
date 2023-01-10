import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth';
import { Document, Page, Text } from 'react-pdf/dist/esm/entry.webpack5';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { AiOutlineDownload } from 'react-icons/ai';

import 'react-datepicker/dist/react-datepicker.css';
import Loading from '../../components/Loading';

const dateRanges = [
	'Today',
	'Yesterday',
	'This Week',
	'Previous Week',
	'This Month',
	'Previous Month',
	'This Quarter',
	'Previous Quarter',
	'This Year',
	'Previous Year',
	'Custom',
];

function Statements() {
	useEffect(() => {
		document.title = 'DCI Vendor Portal | Statements';
	}, []);
	useEffect(() => {
		getStatement();
	}, []);

	const [statementData, setData] = useState();
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const [selectedTime, setSelectedTime] = useState('Today');

	const [filterTimeModal, setFilterTimeModal] = useState(false);

	const [loading, setLoading] = useState(true);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const onDocumentLoadSuccess = ({ numPages }) => {
		const pages = Array(numPages);
		for (var i = 0; i < numPages; i++) {
			pages[i] = "";
		}
		setNumPages(pages);
		setLoading(false);
	};

	function getStartEndDate () {
		function formatDate(date) {
			return date < 10 ? `0${date}` : date;
		}
		const start = `${startDate.getFullYear()}-${formatDate(startDate.getMonth() + 1)}-${formatDate(startDate.getDate())}`;
		const end = `${endDate.getFullYear()}-${formatDate(endDate.getMonth() + 1)}-${formatDate(endDate.getDate())}`;
		
		return { start, end }
	}

	async function getStatement() {
		setLoading(true);
		const { start, end } = getStartEndDate();
		axios
			.get(`/api/statements/?contact_id=${Auth.getProfile().books_account_id}&start=${start}&end=${end}`,
				{
					responseType: 'blob',
				}
			)
			.then((data) => {
				const url = URL.createObjectURL(data.data);
				setData(url);
			})
			.catch((err) => {
				// if (err.response.status === 401) {
				// 	Auth.reAuth().then(() => getStatement());
				// }
				console.log('error: ' + err);
			});
	}

	function downloadFile(e) {
		const id = e.target.id;
		e.preventDefault();

		if (id === 'statement') {
			try {
				const { start, end } = getStartEndDate();
				const string = `statement_${start} ${end}_${JSON.parse(sessionStorage.getItem('account')).company_name}`

				const link = document.createElement('a');
				link.href = statementData;
				link.download = string + '.pdf';
				link.dispatchEvent(new MouseEvent('click'));
			} catch (e) {
				console.log(e);
			}
		}
	}

	function handleDateChange(dateString) {
		const date = new Date();
		setSelectedTime(dateString);

		if (dateString.includes('Today')) {
			setStartDate(date);
			setEndDate(date);
		}
		if (dateString.includes('Yesterday')) {
			setStartDate(new Date(date.setDate(date.getDate() - 1)));
			setEndDate(new Date(date.setDate(date.getDate() - 1)));
		}
		if (dateString.includes('Week')) {
			const sunday = date.getDate() - date.getDay();
			const start = date.setDate(
				sunday - (dateString.includes('Previous') && 7)
			);
			const end = date.setDate(
				sunday + 6 - (dateString.includes('Previous') && 7)
			);

			setStartDate(new Date(start));
			setEndDate(new Date(end));
		}
		if (dateString.includes('Month')) {
			const start = new Date();
			const end = new Date();

			// set the day to the first of the month
			start.setDate(1);
			// if previous is selected, subtract a month
			start.setMonth(
				start.getMonth() - (dateString.includes('Previous') && 1)
			);
			setStartDate(start);

			// get day in month based on next month - one day (gets max day of previous month)
			const month = start.getMonth() + 1;
			end.setDate(new Date(start.getFullYear(), month, 0).getDate(0));
			end.setMonth(start.getMonth());
			setEndDate(end);
		}
		if (dateString.includes('Quarter')) {
			const getStartMonth = (month) => {
				// if it's the beginning of the year and they want the last quarter (last year)
				if (
					Math.floor(month / 3) === 0 &&
					dateString.includes('Previous')
				) {
					const newDate = new Date();
					newDate.setMonth(9);
					newDate.setFullYear(date.getFullYear() - 1);
					return newDate;
				} else {
					// return date with starting month depending on this or previous quarter
					return new Date().setMonth(
						Math.floor(date.getMonth() / 3) * 3 -
							// remove 3 months if it's the previous quarter
							(dateString.includes('Previous') && 3)
					);
				}
			};
			const monthAndYearDate = getStartMonth(date.getMonth());

			const start = new Date(monthAndYearDate);
			start.setDate(1);
			setStartDate(start);

			const end = new Date(monthAndYearDate);
			const endMonth = end.getMonth() + 2;
			end.setMonth(endMonth);
			end.setDate(
				new Date(end.getFullYear(), endMonth + 1, 0).getDate(0)
			);
			setEndDate(end);
		}
		if (dateString.includes('Year')) {
			const start = new Date();
			const end = new Date();

			if (dateString.includes('Previous')) {
				start.setFullYear(date.getFullYear() - 1);
				end.setFullYear(date.getFullYear() - 1);
			}

			start.setMonth(0);
			start.setDate(1);

			end.setMonth(11);
			end.setDate(31);

			setStartDate(start);
			setEndDate(end);
		}
		if (dateString !== 'Custom') setFilterTimeModal(!filterTimeModal);
	}

	function handleModalClose (e) {
		const target = e.target.className;
		if (target === 'modal-background') setFilterTimeModal(false);
	}

	// set end date same as start date if it goes before
	useEffect(() => {
		if (endDate.getTime() < startDate.getTime()) {
			setEndDate(startDate);
		}
	}, [startDate]);

	return (
		<section 
			style={{ marginLeft: '5px', marginTop: '15px', maxWidth: 'fit-content', textAlign: 'start' }}
			onClick={handleModalClose}>
            {/* Nav Bar */}
			Date Range
			<div className="flex" style={{ justifyContent: 'space-between', marginBottom: '15px', minWidth: '300px' }}>
				<div className="flex">
                    {/* Date range and Go button */}
					<div
						id="date-range"
						className={`${filterTimeModal && 'filter-open'}`}
						onClick={(e) => setFilterTimeModal(!filterTimeModal)}
					>
						{selectedTime}
					</div>
					<button
						id="change-date"
						className="box-border btn"
						onClick={(e) => getStatement()}
                        style={{ marginLeft: '20px' }}
					>
						Go
					</button>
				</div>
                {/* Print Statement */}
				<div>
					<button
						id="statement"
						className="box-border btn"
						onClick={downloadFile}
                        style={{ marginRight: '20px' }}
					>
						<AiOutlineDownload />
					</button>
				</div>
			</div>

            {/* Date filter */}
			<div
				className={`pay-filter-container ${
					filterTimeModal && 'filter-open'
				}`}
			>
				<div className="pay-filter-itms">
					{dateRanges.map((date) => (
						<div
							className={`indiv-date-range ${
								date === selectedTime && 'active'
							}`}
							key={date}
							onClick={(e) => handleDateChange(date)}
						>
							{date}
						</div>
					))}
				</div>
				<div>
					<div className="flex">
						<div
							className="flex"
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								marginRight: '10px',
							}}
						>
							Start
							{selectedTime === 'Custom' && (
								<div
									className="react-datepicker-wrapper"
									style={{ marginBottom: '3px' }}
								>
									<div className="react-datepicker__input-container">
										<input
											type="text"
											value={startDate.toLocaleDateString()}
											onChange={(date) =>
												setStartDate(date)
											}
											disabled
										/>
									</div>
								</div>
							)}
							<DatePicker
								selected={startDate}
								onChange={(date) => {
									setStartDate(date);
									setSelectedTime('Custom');
								}}
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								inline={selectedTime === 'Custom' && true}
							/>
						</div>
						<div
							className="flex"
							style={{
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							End
							{selectedTime === 'Custom' && (
								<div
									className="react-datepicker-wrapper"
									style={{ marginBottom: '3px' }}
								>
									<div className="react-datepicker__input-container">
										<input
											type="text"
											value={endDate.toLocaleDateString()}
											onChange={(date) =>
												setEndDate(date)
											}
											disabled
										/>
									</div>
								</div>
							)}
							<DatePicker
								selected={endDate}
								onChange={(date) => {
									setEndDate(date);
									setSelectedTime('Custom');
								}}
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								style={{ width: 'min-content' }}
								minDate={startDate}
								inline={selectedTime === 'Custom' && true}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={`${filterTimeModal && 'modal-background'}`} style={{ backgroundColor: 'transparent' }} />

            {/* PDF View */}
				{loading && <Loading />}
				<div className={`border pdf-view-container ${loading && 'hidden'}`}>
					<Document
						file={statementData}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						{numPages && numPages.map((_, index) => (
							<Page 
								key={'page'+ index + 1}
								scale={document.getElementById('root').clientWidth / 1250 * (96/72)} 
								pageNumber={index + 1}
							>
								<p className='pdf-page-num'>{index + 1} of {numPages.length}</p>
							</Page>
						))}
						
					</Document>
				</div>
			
		</section>
	);
}

export default Statements;
