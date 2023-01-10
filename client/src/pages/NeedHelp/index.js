import React from "react";

function NeedHelp ({ showHelp, setHelp }) {
    function handleClick (e) {
        if (e.target.localName === 'a') {
            setHelp(false);
        }
    }

    return (
        <div className="help-container" style={{ transform: showHelp ? 'translateY(0px) scale(1)' : 'translateY(200px) scale(0)' }}>
            <div className="help-container-top">
                <div className="help-title">Select Language</div>
                <div className="help-pdf-wrapper" onClick={handleClick}>
                    <div className="help-pdf" id='help-eng'>
                        <a download='Customer Portal - English.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/Customer Portal - English.pdf'}
                           >
                            English
                        </a>
                    </div>
                    <div className="help-pdf" id='help-chi'>
                        <a download='客户门户 - 简体中文.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/客户门户 - 简体中文.pdf'}
                           >
                            中国人
                        </a>
                    </div>
                    <div className="help-pdf" id='help-chitra'>
                        <a download='客戶門戶 - 繁體中文.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/客戶門戶 - 繁體中文.pdf'}
                           >
                            中國傳統的
                        </a>
                    </div>
                    <div className="help-pdf" id='help-spa'>
                        <a download='Portal del Cliente - Español.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/Portal del Cliente - Español.pdf'}
                           >
                            Español
                        </a>
                    </div>
                    <div className="help-pdf" id='help-ger'>
                        <a download='Kundenportal - Deutsch.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/Kundenportal - Deutsch.pdf'}
                           >
                            Deutsch
                        </a>
                    </div>
                    <div className="help-pdf" id='help-fre'>
                        <a download='Portail client - Français.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/Portail client - Français.pdf'}
                           >
                            Français
                        </a>
                    </div>
                    <div className="help-pdf" id='help-ita'>
                        <a download='Portale Clienti - Italiano.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/Portale Clienti - Italiano.pdf'}
                           >
                            Italiano
                        </a>
                    </div>
                    <div className="help-pdf" id='help-jap'>
                        <a download='カスタマーポータル - 日本語.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/カスタマーポータル - 日本語.pdf'}
                           >
                            日本
                        </a>
                    </div>
                    <div className="help-pdf" id='help-kor'>
                        <a download='고객 포털 - 한국어.pdf' 
                           href={process.env.PUBLIC_URL+ '/PDF/고객 포털 - 한국어.pdf'}
                           >
                            한국인
                        </a>
                    </div>
                    {/* <object data={process.env.PUBLIC_URL+ '/PDF/고객 포털 - 한국어.pdf'} type="application/pdf" width="100%" height="100%">
                        <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                    </object> */}
                </div>
            <div className="btm-cover" />
            </div>
            <div className="help-container-btm" />
        </div>
    )
}

export default NeedHelp;