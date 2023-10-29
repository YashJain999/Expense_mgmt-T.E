import React,{ useState } from 'react';
import { NavLink,Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// import './Sidebar.css'; // Import your custom CSS file for Sidebar styling
// import Navbar from './Navbar';


export default function Sidebar() {

    const linkStyle = {
        textDecoration: 'none',
        border :'none'
    };

    //showing budget list
    const [shouldShowBudget, setShouldShowBudget] = useState([]); 
    const [isBudgetListVisible, setIsBudgetListVisible] = useState(false);
    const toggleBudgetList =() => {
    const buttonObject1 = ([
        {text:'Enter Budget'            ,onClick:()=>{}},
        {text:'Generate Budget Report'  ,onClick:()=>{alert("Generate budget Report was clicked")}},
        {text:'View Budget'             ,onClick:()=>{alert("View budget was clicked")}},
        {text:'Update Financial Year'   ,onClick:()=>{alert("Update Financial Year was clicked")}},
    ])
    setShouldShowBudget(buttonObject1)
    setIsBudgetListVisible(!isBudgetListVisible);
    }

    const [shouldShowQuotation, setShouldShowQuotation] = useState([]);  
    const [isQuotationListVisible, setIsQuotationListVisible] = useState(false);
    const toggleQuotationList =() => {
        const buttonObject2 = ([
            {text:'Q.B1'            ,onClick:()=>{alert("qb1 was clicked")}},
            {text:'Q.B2'            ,onClick:()=>{alert("qb2 was clicked")}},
            {text:'Q.B3'            ,onClick:()=>{alert("qb3 clicked")}},
            {text:'Q.B4'            ,onClick:()=>{alert("qb4 was clicked")}},
        ])
        setShouldShowQuotation(buttonObject2)
        setIsQuotationListVisible(!isQuotationListVisible);
    }

    const [shouldShowPurchase, setShouldShowPurchase] = useState([]);
    const [isPurchaseListVisible, setIsPurchaseListVisible] = useState(false);
    const togglePurchaseList =() => {
        const buttonObject3 = ([
            {text:'p.B1'            ,onClick:()=>{alert("pb1 was clicked")}},
            {text:'p.B2'            ,onClick:()=>{alert("pb2 was clicked")}},
            {text:'p.B3'            ,onClick:()=>{alert("pb3 clicked")}},
            {text:'p.B4'            ,onClick:()=>{alert("pb4 was clicked")}},
        ])
        setShouldShowPurchase(buttonObject3)
        setIsPurchaseListVisible(!isPurchaseListVisible);
    }

    const [shouldShowBills, setShouldShowBills] = useState([]);  
    const [isBillsListVisible, setIsBillsListVisible] = useState(false);
    const toggleBillsList =() => {
        const buttonObject4 = ([
            {text:'b.B1'            , },
            {text:'b.B2'            ,onClick:()=>{alert("bb2 was clicked")}},
            // {text:'b.B3'            ,onClick:()=>{alert("pb3 clicked")}},
            // {text:'b.B4'            ,onClick:()=>{alert("pb4 was clicked")}},
        ])
        setShouldShowBills(buttonObject4)
        setIsBillsListVisible(!isBillsListVisible);
    }

    const [shouldShowCDS, setShouldShowCDS] = useState(true); 
    const [isCDSListVisible, setIsCDSListVisible] = useState(false);
    const toggleCDSList=() => {
        const buttonObject5 = ([
            {text:'cds.B1'            ,onClick:()=>{alert("cdsb1 was clicked")}},
            {text:'cds.B2'            ,onClick:()=>{alert("cdsb2 was clicked")}},
            // {text:'cds.B3'            ,onClick:()=>{alert("cdsb3 clicked")}},
            // {text:'cds.B4'            ,onClick:()=>{alert("cdsb4 was clicked")}},
        ])
        setShouldShowCDS(buttonObject5)
        setIsCDSListVisible(!isCDSListVisible);
    }

    const [shouldShowFeedback, setShouldShowFeedBack] = useState(true); 
    const [isFeedBackListVisible, setIsFeedBackListVisible] = useState(false);
    const toggleFeedBackList=() => {
        const buttonObject6 = ([
            {text:'cds.B1'            ,onClick:()=>{alert("cdsb1 was clicked")}},
            {text:'cds.B2'            ,onClick:()=>{alert("cdsb2 was clicked")}},
            // {text:'cds.B3'            ,onClick:()=>{alert("cdsb3 clicked")}},
            // {text:'cds.B4'            ,onClick:()=>{alert("cdsb4 was clicked")}},
        ])
        setShouldShowFeedBack(buttonObject6)
        setIsFeedBackListVisible(!isFeedBackListVisible);
    }

    const [shouldShowList, setShouldShowList] = useState(true); 
    const toggleList =() => {
        setShouldShowList(!shouldShowList)  
    }

    // const additionalClasses="offcanvas-header"
    return (
    <> 
        <div className="offcanvas offcanvas-start text-bg-dark border-bottom show" data-bs-backdrop="false" data-bs-theme="dark" tabIndex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel" style={{width:260}}>
        <div className="offcanvas-header ">
            <h5 className="offcanvas-title" id="offcanvasDarkLabel">Labtracker</h5>
            {/* <button >
            <i class="fa-solid fa-bars"></i>
            </button> */}
            <button type="button" className="btn btn-close text-reset " data-bs-dismiss="offcanvas" data-bs-backdrop="false" aria-label="Close"></button>
        </div>                                                                                                                         
            <div className="offcanvas-body">
                <ul className="list-group list-group-flush">
                        {shouldShowList && ((                
                        <li className='list-group-item'>
                        <NavLink to ="/budget" style={linkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleBudgetList();toggleList()}}>Budget</button>
                        </NavLink>
                            {/* <i class="fa-solid fa-chevron-left ms-5"></i> */}
                        </li>
                        ))}
                        {isBudgetListVisible && (
                            <ul className="list-group list-group-flush">
                                <li className='list-group-item'>
                                <NavLink to ="/" style={linkStyle}>
                                    <button type="button" className="btn btn" onClick={() => {toggleBudgetList();toggleList()}}>Budget</button>
                                </NavLink>
                                </li>
                                <div className=" m-n1 pt-2 container" >
                                {shouldShowBudget.map((item, index) => (
                                <li>
                                    <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                                </li>
                                ))}
                                </div>
                            </ul>
                        )}
                        {shouldShowList && ((
                        <li className="list-group-item">
                        <NavLink to ="/quotation" style={linkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleQuotationList();toggleList()}}>Quotation</button>
                        </NavLink>
                        </li>
                        ))}
                        {isQuotationListVisible && (
                            <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                            <NavLink to ="/" style={linkStyle}>
                                <button type="button" className="btn btn" onClick={() => {toggleQuotationList();toggleList()}}>Quotation</button>
                            </NavLink>
                            </li>
                            <div className=" m-n1 pt-2 container" >
                            {shouldShowQuotation.map((item, index) => (
                            <li>
                                <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                            </li>
                            ))}
                            </div>
                            </ul>
                        )}
                        {shouldShowList && ((
                        <li className="list-group-item">
                        <NavLink to ="/purchase" style={linkStyle}>
                            <button type="button" className="btn btn" onClick={() => {togglePurchaseList();toggleList()}}>Purchase</button>
                        </NavLink>
                        </li>
                        ))}
                        {isPurchaseListVisible && (
                            <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                            <NavLink to ="/" style={linkStyle}>
                                <button type="button" className="btn btn" onClick={() => {togglePurchaseList();toggleList()}}>Purchase</button>
                            </NavLink>
                            </li>
                            <div className=" m-n1 pt-2 container" >
                            {shouldShowPurchase.map((item, index) => (
                            <li>
                                <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                            </li>
                            ))}
                            </div>
                            </ul>
                        )}
                        {shouldShowList && ((
                        <li className="list-group-item">
                        <NavLink to ="/bills" style={linkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleBillsList();toggleList()}}>Bills</button>
                        </NavLink>
                        </li>
                        ))}
                        {isBillsListVisible && (
                            <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                            <NavLink to ="/" style={linkStyle}>
                                <button type="button" className="btn btn" onClick={() => {toggleBillsList();toggleList()}}>Bills</button>
                            </NavLink>
                            </li>
                            <div className=" m-n1 pt-2 container" >
                            {shouldShowBills.map((item, index) => (
                            <li>
                                <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                            </li>
                            ))}
                            </div>
                            </ul>
                        )}
                        {shouldShowList && ((
                        <li className="list-group-item">
                        <NavLink to ="/centraldeadstock" style={linkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleCDSList();toggleList()}}>Central Dead Stock</button>
                        </NavLink>
                        </li>
                        ))}
                        {isCDSListVisible && (
                            <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                            <NavLink to ="/" style={linkStyle}>
                                <button type="button" className="btn " onClick={() => {toggleCDSList();toggleList()}}>Central Dead Stock</button>
                            </NavLink>
                            </li>
                            <div className=" m-n1 pt-2 container" >
                            {shouldShowCDS.map((item, index) => (
                            <li>
                                <button type="button" className="btn " key={index} onClick={item.onClick}>{item.text}</button>
                            </li>
                            ))}
                            </div>
                            </ul>
                        )}
                        {shouldShowList && ((
                        <li className="list-group-item">
                        <NavLink to ="/feedback" style={linkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleFeedBackList();toggleList()}}>Feedback</button>
                        </NavLink>
                        </li>
                        ))}
                        {isFeedBackListVisible && (
                            <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                            <NavLink to ="/" style={linkStyle}>
                                <button type="button" className="btn " onClick={() => {toggleFeedBackList();toggleList()}}>Feedback</button>
                            </NavLink>
                            </li>
                            <div className=" m-n1 pt-2 container" >
                            {shouldShowFeedback.map((item, index) => (
                            <li>
                                <button type="button" className="btn " key={index} onClick={item.onClick}>{item.text}</button>
                            </li>
                            ))}
                            </div>
                            </ul>
                        )}
                        {shouldShowList && ((
                        <li className="list-group-item">
                            <button type="button" className="btn btn" onClick={toggleList}>Logout</button>
                        </li>
                        ))}
                </ul> 
            </div>
        </div>
        {/* </aside> */}
    </>
  )
}

// off canvas   
// scrollspy
// pagination
