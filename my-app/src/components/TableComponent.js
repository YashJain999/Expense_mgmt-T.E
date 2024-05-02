import React from 'react'
import PropTypes from "prop-types";


/**
 *  TABLE HEADER DATA
 *  thData=[{ text: header1 ,className: className1},{text: header2,className: className2},...] 
 * 
 *  TABLE BODY DATA
 *  tbData=[
 *          [{item: item1 , styles: itemstyles ,className: itemclassName}], //ROW1
 *          [{}],//ROW2
 *          ... ,//ROW n
 *  ] //item can be text or input(html) or anything
 *  
 *  TABLE FOOTER DATA(CAN BE OPTIONAL)
 *  tfData=[{text: item1 , styles: itemstyles, className: className1 },{text: item1 , styles: itemstyles, className: className2 },...]
 */

const TableComponent = ({ caption: tCaption, thData, tbData, tfData }) => {
    return (
        <div className="table-responsive shadow w-100 h-100 rounded-4" style={{ opacity: 0.9 }}>
            <table className="table table-hover w-100 h-100 m-0 caption-top">
                {tCaption &&
                    <caption className='ps-2 text-center h2 bg-primary bg-gradient text-white m-0'>{tCaption}</caption>
                }
                <thead className='table-primary w-100'>
                    <tr className='text-center w-100'>
                        {thData.map((item, index) => (
                            <th className={`${item.className}`} key={index}>{item.text}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='w-100'>
                    {tbData.map((row, index) => (
                        <tr key={index} className='w-100'>
                            {row.map((item, index) => (
                                <td className={`${item.className}`} key={index} style={item.styles ? item.styles : {}}>{item.item}</td>
                            ))}
                        </tr>
                    ))}
                    {tfData && (
                        <tr className='table-info w-100'>
                            {tfData.map((item, index) => (
                                <td className={`fw-bold text-uppercase ${item.className}`} style={item.styles ? item.styles : {}} key={index}>{item.text}</td>
                            ))}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

//setting proptypes for props
TableComponent.prototype = {
    thData: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            className: PropTypes.string,
        })
    ).isRequired,

    tbData: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                item: PropTypes.any.isRequired,
                styles: PropTypes.objectOf(
                    PropTypes.string.isRequired
                ),
                className: PropTypes.string
            })
        )
    ).isRequired,

    tfData: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            styles: PropTypes.objectOf(
                PropTypes.string.isRequired
            ),
            className: PropTypes.string,
        })
    )
};
export default TableComponent

