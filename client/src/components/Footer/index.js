import React from 'react';
import './index.css';

function Footer () {
    return (
        <footer id="main-footer">
            <div className="container">
                <div id="footer-widgets" className="clearfix">
                    <div className="footer-widget">
                        <div id="custom_html-2" className="widget_text fwidget et_pb_widget widget_custom_html">
                            <div className="textwidget custom-html-widget">
                                <div className="textwidget">
                                    <div className="cust_img">
                                        <img className="alignnone size-medium wp-image-456 alignleft" src={process.env.PUBLIC_URL + "/new_nqa_logos_combined_2@2x-100.jpg"} alt="isocert" width="123" height="288" border="0" />
                                    </div>
                                    <div className="cust_text">
                                        <h4>Eliminate the middleman, contact Direct today for authentic Altera products!</h4>
                                        <p><strong>Customer and Technical Support</strong><br />Monday — Friday<br />8:30 AM EST – 5:30 PM EST</p>
                                        <p> <strong>Call</strong><br /> Toll Free <a href="tel:8555420488">855.542.0488</a> or <a href="tel:8136694868">813.669.4868</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="footer-widget">
                    <div id="black-studio-tinymce-18" className="fwidget et_pb_widget widget_black_studio_tinymce">
                        <div className="textwidget">
                            <h4>PAGES</h4>
                            <ul className="footer_list">
                                <li><a href="https://www.directics.com/wp-content/uploads/2022/02/AS9120B-ISO-2015-Cert-AS16186-EXP-010425.pdf">ISO 9001:2015 and AS9120:2016 Certificate</a>
                                </li>
                                <li><a href="https://www.directics.com/wp-content/uploads/2021/11/Direct-Components-Linecard-Rev-004.pdf">Direct Components Line Card</a>
                                </li>
                                <li><a href="https://www.directics.com/wp-content/uploads/2019/01/Purchase-Order-Terms-Conditions-Rev-001.pdf">Purchase Order Terms &amp; Conditions</a>
                                </li>
                                <li><a href="https://www.directics.com/wp-content/uploads/2021/02/Sales-Terms-Conditions-Rev-005.pdf">Sales Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-widget">
                    <div id="black-studio-tinymce-15" className="fwidget et_pb_widget widget_black_studio_tinymce">
                        <div className="textwidget">
                            <h4>USEFUL LINKS</h4>
                            <ul className="footer_list">
                                <li><a href="https://www.directics.com/altera-fpga/">Altera FPGA</a></li>
                                <li><a href="https://www.directics.com/fpga-board/">FPGA Board</a></li>
                                <li><a href="https://www.directics.com/fpga-programming/">FPGA Programming</a></li>
                                <li><a href="https://www.directics.com/electronic-components-list/">Electronic Components List</a></li>
                                <li><a href="https://www.directics.com/xilinx-parts/">Xilinx</a></li>
                                <li><a href="https://www.directics.com/xilinx-spartan/">Xilinx Spartan</a></li>
                                <li><a href="https://www.directics.com/xilinx-fpga/">Xilinx FPGA</a></li>
                                <li><a href="https://www.directics.com/artix7/">Artix 7</a></li>
                                <li><a href="https://www.directics.com/octopart">Octopart</a></li>
                                <li><a href="https://www.directics.com/oemstrade">Oemstrade</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-widget">
                    <div id="black-studio-tinymce-13" className="fwidget et_pb_widget widget_black_studio_tinymce">
                        <div className="textwidget">
                            <h4>CONTACT US</h4>
                            <ul className="footer_list">
                                <li>
                                    <a href="https://g.page/direct-components?share" target="_blank" rel="noreferrer">Direct Components, Inc.<br />
                                        5439 Beaumont Center Blvd.<br />
                                        Suite 1040<br />
                                        Tampa, FL 33634 USA<br />
                                    </a>
                                    <a href="tel:8136694868">813-669-4868</a>
                                </li>
                            </ul>
                            <div className="follow-us">
                                <h4>FOLLOW US ON</h4>
                                <ul className="social-icons">
                                    <li><a href="https://www.facebook.com/pages/Direct-Components-Inc/1533161330240930?fref=nf" target="_blank" rel="noreferrer">
                                        <img src="https://directics.com/wp-content/themes/divi-child/images/social/facebook-square-brands-ko.svg" alt="facebook" width="25" height="25" /></a>
                                    </li>
                                    <li><a href="https://twitter.com/Directcomp123" target="_blank" rel="noreferrer">
                                        <img src="https://directics.com/wp-content/themes/divi-child/images/social/twitter-square-brands-ko.svg" alt="twitter" width="25" height="25" /></a>
                                    </li>
                                    <li><a href="https://www.linkedin.com/company/direct-components-inc/" target="_blank" rel="noreferrer">
                                        <img src="https://directics.com/wp-content/themes/divi-child/images/social/linkedin-brands-ko.svg" alt="linked-in" width="25" height="25" /></a>
                                    </li>
                                    <li><a href="https://www.youtube.com/channel/UC00sIKjd5SCa-pzZC49DYKA" target="_blank" rel="noreferrer">
                                        <img src="https://directics.com/wp-content/themes/divi-child/images/social/youtube-square-brands-ko.svg" alt="You Tube" width="25" height="25" /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <div className="footer-5">
            <div className="container"></div>
        </div>
        <div id="footer-bottom">
            <div className="container clearfix">
                <ul className="et-social-icons"></ul>
                <div style={{ textAlign: 'center', color: '#cccccc' }}>©2022 Direct Components, Inc. All Rights Reserved.</div> 
            </div> 
        </div>
    </footer>
    )
}

export default Footer;