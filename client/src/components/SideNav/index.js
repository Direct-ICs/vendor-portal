import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../ChangePassword';
import HiddenNav from '../HiddenNav';
import { IoHomeOutline, IoCartOutline } from 'react-icons/io5';
import { IoMdPaper } from 'react-icons/io';
import { BiDislike, BiLike, BiBell } from 'react-icons/bi';
import {MdPendingActions} from 'react-icons/md';
import { TbFileInvoice, TbReportMoney } from 'react-icons/tb';
import "./style.css";

const user = JSON.parse(sessionStorage.getItem('user'));
let first_name, last_name;
user && (
{ first_name, last_name } = user
)

function SideNav() {
	let navigate = useNavigate();
	const routeChange = (event) => {
		const route =
			event.target.id !== ''
				? event.target.id
				: event.target.parentElement.id;
		navigate(`${route}`);
		setShowNav(false);
	};

	const [showNav, setShowNav] = useState(false);
	const [modalOpen, setModalOpen] = useState('false');
	
	const navItems = {
		show: [['Home'], ['RFQ - Pending','RFQ - Bid','RFQ - No Bid'], ['Purchase Orders', 'Bills', 'Payments Received', 'Statements']],
		url: [['/home'], ['/pending', '/bids', '/nobid'], ['/orders', '/bills', '/payments', '/statements']],
		icon: [[<IoHomeOutline />], [<MdPendingActions />, <BiLike />, <BiDislike />], [<IoCartOutline />, <TbFileInvoice />, <TbReportMoney />, <IoMdPaper />]]
	};

	return (<>	
		<HiddenNav setShowNav={setShowNav} showNav={showNav} />
		<ChangePassword modalOpen={modalOpen} setModalOpen={setModalOpen} />

		<div className={`side-nav-container ${showNav && 'show-nav'}`}>
			{/* Navigation tabs */}
			<div className="side-nav-category">
				{navItems.show.map((itemGroup, topIndex) => (<>
					{(topIndex !== 0) &&
						<div key={topIndex + "itemGroup"} className='navbar-seperator'> | </div>
					}
					{itemGroup.map((item, index) => (
					<div
						className={`side-nav-button nav-group link ${
							window.location.pathname.includes(navItems.url[topIndex][index]) ? 'active' : ''
						}`}
						id={navItems.url[topIndex][index]}
                        key={navItems.url[topIndex][index]}
						onClick={routeChange}
					>
						<span style={{ padding: '10px', paddingLeft: '10px', alignContent: "center" }}>{navItems.icon[topIndex][index]} {item}</span>
					</div>
					))}
				</>))}
			</div>
			<div className='right-side'>
				<div className='notifications'>
					<BiBell />
				</div>
				<div className="side-nav-name">
					<span>{first_name} {last_name}</span>
				</div>
			</div>
		</div>
	</>);
}

export default SideNav;
