import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './components/SideNav';
import Orders from './pages/Orders';
import AuthRedirect from './pages/AuthRedirect';
import SingleDetailed from './pages/SingleDetailed';
import SignOn from './pages/SignOn';
import Bills from './pages/Bills';
import Home from './pages/Home';
import Payments from './pages/Payments';
import Statements from './pages/Statements';
import GetLoginDetails from './pages/GetLoginDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ForgotPassword from './pages/ForgotPassword';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Auth from './utils/auth';
import SelectCompany from './pages/SelectCompany';
import Tracking from './pages/Tracking';
import PendingBids from './pages/PendingBids';
import NoBids from './pages/NoBids';
import Bids from './pages/Bids';

function App() {
	document.title = "Direct Components Customer Portal";
	return (<>
		<section className="top-level" style={{ flexDirection: 'column' }}>
			{!Auth.loggedIn() 
      	? (
			<Router>
				<Routes>
					<Route path='/login' element={<SignOn />} />
					<Route path='/login/get-details' element={<GetLoginDetails />} />
					<Route path='/login/forgot' element={<ForgotPassword />} />
					<Route path='*' element={<SignOn />} />
				</Routes>
			</Router>
			) 
      	: (
			<Router>
			{Auth.getAccountLength() > 1 && JSON.parse(localStorage.getItem("accindex")) === null 
			? (
				<Routes>
					<Route path='*' element={<SelectCompany />} />
				</Routes>
				)
			: (<>
				<SideNav />
					<ToastContainer />
        
					<div className="content-body">
						<Routes>
							<Route path="/pending" element={<PendingBids />} />
							<Route path="/nobid" element={<NoBids />} />
							<Route path="/bids" element={<Bids />} />
							<Route path='/home' element={<Home />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/auth/redirect" element={<AuthRedirect />} />
							<Route path="/orders/:orderid" element={<SingleDetailed />} />
							<Route path="/bills/:billid" element={<SingleDetailed />} />
							{/* <Route path="/tracking" element={<Tracking />} /> */}
							<Route path="/bills" element={<Bills />} />
							<Route path='/payments' element={<Payments />} />
							<Route path='/statements' element={<Statements />} />
              				<Route path='*' element={<Home />} />

						</Routes>
					</div>
			</>)}
			</Router>
		)}
		</section>
	</>);
}

export default App;
