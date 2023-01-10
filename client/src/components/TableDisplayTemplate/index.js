import React from "react";

function TableDisplayTemplate ({ info, type, layout }) {

    return (
        <div className='template-info border'>
            <div className='flex table-navigation'>
                <div className='logo'>
                    <img src='https://www.directics.com/wp-content/uploads/2022/04/dico-logo-update@2x.png' 
                        width={150}/>
                </div>
                <h2>{type}</h2>
            </div>
            
            <div className="flex">
            {/* {layout.forEach((row, index) => {
                {info[index].forEach((column, index) => {
                    {column.forEach(item => {
                        <div>{item}</div>
                    })}
                })}
            })} */}
            </div> 
        </div>
    );
}

export default TableDisplayTemplate;