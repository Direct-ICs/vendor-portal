import React from 'react';
import './index.css';
import { AiFillCaretDown, AiOutlineMenu } from 'react-icons/ai';

function TopNav () {
    return (
    <div style={{ zIndex: 999, overflow: 'hidden' }}>
        <div id="page-container">
            <div className="hdr">
                <div className="container">
                    <div className="col-md-4 col-sm-12">
                        <div className="logo-section">
                            <a href="https://www.directics.com">
                                <img src="https://www.directics.com/wp-content/uploads/2022/07/DICO-HORIZ-LOGO_GRADIENT-1.png" alt="logo" width="225" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="nav">
            <div className="container">
                <div className="navbar-section">
                    <div id="mega-menu-wrap-primary-menu" className="mega-menu-wrap">
                        <div className="mega-menu-toggle">
                            <div className="mega-toggle-blocks-left"></div>
                            <div className="mega-toggle-blocks-center"></div>
                            <div className="mega-toggle-blocks-right">
                                <div className="mega-toggle-block mega-menu-toggle-block mega-toggle-block-1" id="mega-toggle-block-1" tabIndex="0">
                                    <span className="mega-toggle-label" role="button" aria-expanded="false">
                                        <span className="mega-toggle-label-closed"
                                            onClick={(e) => e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].classList.toggle('mega-menu-open')}>
                                                MENU <AiOutlineMenu className='icon' style={{ verticalAlign: 'text-bottom', paddingLeft: '5px', fontSize: 'large' }} />
                                        </span>
                                        <span className="mega-toggle-label-open"
                                            onClick={(e) => e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].classList.toggle('mega-menu-open')}>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ul id="mega-menu-primary-menu" className="mega-menu max-mega-menu mega-menu-horizontal" data-event="hover" data-effect="fade_up" data-effect-speed="200" data-effect-mobile="disabled" data-effect-speed-mobile="0" data-mobile-force-width="false" data-second-click="go" data-document-click="collapse" data-vertical-behaviour="standard" data-breakpoint="768" data-unbind="true" data-mobile-state="collapse_all" data-hover-intent-timeout="300" data-hover-intent-interval="100">
                            <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-item-home mega-current-menu-item mega-page_item mega-page-item-150 mega-current_page_item mega-align-bottom-left mega-menu-flyout mega-menu-item-177" id="mega-menu-item-177">
                                <a className="mega-menu-link" href="https://www.directics.com/" tabIndex="0">Home</a>
                            </li>

                            {/* Company */}
                            <li className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-megamenu mega-align-bottom-left mega-menu-megamenu mega-has-icon mega-icon-left mega-menu-item-136490" 
                                id="mega-menu-item-136490"
                                onMouseEnter={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}
                                onMouseLeave={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}>
                                <button className="mega-custom-icon mega-menu-link" aria-expanded="false" tabIndex="0">
                                    Company
                                    <AiFillCaretDown style={{ verticalAlign: 'text-bottom', paddingLeft: '3px' }} />
                                </button>
                                <ul className="mega-sub-menu">
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-columns-1-of-6 mega-menu-item-136494" id="mega-menu-item-136494">
                                        <a className="mega-menu-link" href="https://www.directics.com/company/about-us/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/globe-38x40.png" alt="globe" className="nav-icons" />About Us
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-columns-1-of-6 mega-menu-item-841335" id="mega-menu-item-841335">
                                        <a className="mega-menu-link" href="https://www.directics.com/company/careers/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/about-icon.png" alt="about" className="nav-icons" />Careers
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-1-of-6 mega-menu-item-136496" id="mega-menu-item-136496">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/our-team/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/customers-42x40.png" alt="customers" className="nav-icons" />Our Team
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-columns-1-of-6 mega-menu-item-843038" id="mega-menu-item-843038">
                                        <a className="menu-image-title-after menu-image-not-hovered mega-menu-link" href="https://www.directics.com/live-tour/">
                                            <img width="36" height="36" src="https://www.directics.com/wp-content/uploads/2020/05/tour-36x36.png" className="menu-image menu-image-title-after" alt="" loading="lazy" />
                                                <span className="menu-image-title-after menu-image-title">Tour our office</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            
                            {/* Blog */}
                            <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-842955" id="mega-menu-item-842955">
                                <a className="mega-menu-link" href="https://www.directics.com/blog/" tabIndex="0">
                                    Blog
                                </a>
                            </li>

                            {/* Submit RFQ */}
                            <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-844708" id="mega-menu-item-844708">
                                <a className="mega-menu-link" href="https://www.directics.com/submit-rfq" tabIndex="0">
                                    Submit RFQ
                                </a>
                            </li>
                            
                            {/* Products & Services */}
                            <li className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-megamenu mega-align-bottom-left mega-menu-megamenu mega-menu-item-136491" 
                                id="mega-menu-item-136491"
                                onMouseEnter={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}
                                onMouseLeave={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}>
                                <button className="mega-menu-link" aria-expanded="false" tabIndex="0">
                                    Products &amp; Services
                                    <AiFillCaretDown style={{ verticalAlign: 'text-bottom', paddingLeft: '3px' }} />
                                </button>
                                <ul className="mega-sub-menu">
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-1-of-8 mega-menu-item-136499" id="mega-menu-item-136499">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/products/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/products2-icon.png" alt="products2" className="nav-icons" /> Products
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-3-of-8 mega-menu-item-136500" id="mega-menu-item-136500">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/surplus-inventory-management/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/surplus-icon.png" alt="surplus" className="nav-icons" /> Surplus Inventory Management
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-2-of-8 mega-menu-item-136501" id="mega-menu-item-136501">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/value-added-services/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/careersicon-32x40.png" alt="careersicon" className="nav-icons" /> Value Added Services
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-megamenu mega-align-bottom-left mega-menu-megamenu mega-menu-item-836819" 
                                id="mega-menu-item-836819"
                                onMouseEnter={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}
                                onMouseLeave={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}>
                                <button className="mega-menu-link" aria-expanded="false" tabIndex="0">
                                    FPGA
                                    <AiFillCaretDown style={{ verticalAlign: 'text-bottom', paddingLeft: '3px' }} />
                                </button>
                                <ul className="mega-sub-menu">
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-menu-columns-1-of-8 mega-menu-item-836821" id="mega-menu-item-836821">
                                        <a className="mega-menu-link" href="https://www.directics.com/xilinx-fpga/">
                                            <span className="dashicons dashicons-welcome-widgets-menus after-menu-image-icons"></span>
                                            <span className="menu-image-title-after menu-image-title">
                                                Xilinx FPGA
                                                </span>
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-2-columns mega-menu-columns-4-of-8 mega-menu-item-837026" id="mega-menu-item-837026">
                                        <a className="mega-menu-link" href="https://www.directics.com/altera-fpga/">
                                            <span className="dashicons dashicons-welcome-widgets-menus after-menu-image-icons"></span>
                                            <span className="menu-image-title-after menu-image-title">
                                                Intel FPGA | Altera FPGA Distributor
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-megamenu mega-align-bottom-left mega-menu-megamenu mega-menu-item-136493" 
                                id="mega-menu-item-136493"
                                onMouseEnter={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}
                                onMouseLeave={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}>
                                <button className="mega-menu-link" aria-expanded="false" tabIndex="0">
                                    Quality
                                    <AiFillCaretDown style={{ verticalAlign: 'text-bottom', paddingLeft: '3px' }} />
                                </button>
                                <ul className="mega-sub-menu">
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-2-of-8 mega-menu-item-136502" id="mega-menu-item-136502">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/certifications-memberships/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/surplus-icon-42x40.png" alt="surplus" className="nav-icons" /> Certifications &amp; Memberships
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-2-of-8 mega-menu-item-136503" id="mega-menu-item-136503">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/counterfeit-mitigation/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/counterfeit-icon.png" className="nav-icons" alt="counterfeit" /> Counterfeit Mitigation
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-2-of-8 mega-menu-item-136504" id="mega-menu-item-136504">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/quality-policy/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/cert-icon-40x40.png" alt="cert" className="nav-icons" /> Quality Policy
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="mega-menu-item mega-menu-item-type-custom mega-menu-item-object-custom mega-menu-item-has-children mega-menu-megamenu mega-align-bottom-left mega-menu-megamenu mega-menu-item-136492" 
                                id="mega-menu-item-136492"
                                onMouseEnter={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}
                                onMouseLeave={(e) => e.currentTarget.classList.toggle('mega-toggle-on')}>
                                <button className="mega-menu-link" aria-expanded="false" tabIndex="0">
                                    Downloads
                                    <AiFillCaretDown style={{ verticalAlign: 'text-bottom', paddingLeft: '3px' }} />
                                </button>
                                <ul className="mega-sub-menu">
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-1-of-6 mega-menu-item-136497" id="mega-menu-item-136497">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/customers/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/customers-40x40.png" alt="customers" className="nav-icons" />Customers
                                        </a>
                                    </li>
                                    <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-has-icon mega-icon-left mega-menu-columns-1-of-6 mega-menu-item-136498" id="mega-menu-item-136498">
                                        <a className="mega-custom-icon mega-menu-link" href="https://www.directics.com/suppliers/">
                                            <img src="https://www.directics.com/wp-content/uploads/2016/08/globe2-40x40.png" alt="globe" className="nav-icons" />Suppliers
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-22" id="mega-menu-item-22">
                                <a className="mega-menu-link" href="https://www.directics.com/contact/" tabIndex="0">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TopNav;