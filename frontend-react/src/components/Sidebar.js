import React,{ useState } from 'react';
import { NavLink } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// import './Sidebar.css'; // Import your custom CSS file for Sidebar styling
// import Navbar from './Navbar';


export default function Sidebar() {

    //style for navlink
    const NavLinkStyle = {
        textDecoration: 'none',
        border :'none',
        color :'none',
    };


    //showing budget list
    const [shouldShowBudget, setShouldShowBudget] = useState([]); 
    const [isBudgetListVisible, setIsBudgetListVisible] = useState(false);
    const toggleBudgetList =() => {
    const buttonObject1 = ([
        {text:'Enter Budget'            ,path:"/budget/enterbudget"},
        {text:'View Budget'             ,path:"/budget/viewbudget"},
        {text:'Upload Budget'           ,path:"/budget/uploadbudget"},       
        {text:'Update Financial Year'   ,path:"/budget/updatefinancialyear"},
    ])
    setShouldShowBudget(buttonObject1)
    setIsBudgetListVisible(!isBudgetListVisible);
    }

    //showing quotation list
    const [shouldShowQuotation, setShouldShowQuotation] = useState([]);  
    const [isQuotationListVisible, setIsQuotationListVisible] = useState(false);
    const toggleQuotationList =() => {
        const buttonObject2 = ([
            {text:'Q.B1'            ,path:"/quotation/uploadquotation"},
            {text:'Q.B2'            ,path:"/quotation/reviewquotation"},
        ])
        setShouldShowQuotation(buttonObject2)
        setIsQuotationListVisible(!isQuotationListVisible);
    }

    //showing purchase list
    const [shouldShowPurchase, setShouldShowPurchase] = useState([]);
    const [isPurchaseListVisible, setIsPurchaseListVisible] = useState(false);
    const togglePurchaseList =() => {
        const buttonObject3 = ([
            {text:'p.B1'            ,path:"/purchase/p.b1"},
            {text:'p.B2'            ,path:"/purchase/p.b2"},
        ])
        setShouldShowPurchase(buttonObject3)
        setIsPurchaseListVisible(!isPurchaseListVisible);
    }

    //showing bills list
    const [shouldShowBills, setShouldShowBills] = useState([]);  
    const [isBillsListVisible, setIsBillsListVisible] = useState(false);
    const toggleBillsList =() => {
        const buttonObject4 = ([
            {text:'b.B1'            ,path:"/bills/b.b1"},
            {text:'b.B2'            ,path:"/bills/b.b2"},
        ])
        setShouldShowBills(buttonObject4)
        setIsBillsListVisible(!isBillsListVisible);
    }

    //showing centraldeadstock list
    const [shouldShowCDS, setShouldShowCDS] = useState(true); 
    const [isCDSListVisible, setIsCDSListVisible] = useState(false);
    const toggleCDSList=() => {
        const buttonObject5 = ([
            {text:'cds.B1'            ,path:"/centraldeadstock/centraldeadstock.b1"},
            {text:'cds.B2'            ,path:"/centraldeadstock/centraldeadstock.b2"},
        ])
        setShouldShowCDS(buttonObject5)
        setIsCDSListVisible(!isCDSListVisible);
    }

    //showing feedback list
    const [shouldShowFeedback, setShouldShowFeedBack] = useState(true); 
    const [isFeedBackListVisible, setIsFeedBackListVisible] = useState(false);
    const toggleFeedBackList=() => {
        const buttonObject6 = ([
            {text:'fdb.B1'            ,path:"/feedback/feedback.b1"},
            {text:'fdb.B2'            ,path:"/feedback/feedback.b2"},
        ])
        setShouldShowFeedBack(buttonObject6)
        setIsFeedBackListVisible(!isFeedBackListVisible);
    }

    //showing main list
    const [shouldShowList, setShouldShowList] = useState(true); 
    const toggleList =() => {
        setShouldShowList(!shouldShowList)  
    }

    return (
    <> 
        <div className="offcanvas offcanvas-start text-bg-dark border-bottom show" data-bs-backdrop="false" data-bs-theme="dark" tabIndex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel" style={{width:260}}>
        <div className="offcanvas-header ">
            <h5 className="offcanvas-title" id="offcanvasDarkLabel">Labtracker</h5>
            <button type="button" className="btn btn-close text-reset " data-bs-dismiss="offcanvas" data-bs-backdrop="false" aria-label="Close"></button>
        </div>                                                                                                                         
            <div className="offcanvas-body">
                <ul className="list-group list-group-flush">
                    {shouldShowList && ((                
                    <li className='list-group-item'>
                    <div className="submenu-item">
                        <NavLink to ="/budget" style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleBudgetList();toggleList()}}>Budget</button>
                        </NavLink>
                    </div>
                    </li>
                    ))}
                    {isBudgetListVisible && (
                        <ul className="list-group list-group-flush">
                            <li className='list-group-item'>
                            <NavLink to ="/" style={NavLinkStyle}>
                                <button type="button" className="btn btn" onClick={() => {toggleBudgetList();toggleList()}}>Budget</button>
                            </NavLink>
                            </li>
                            <div className=" m-n1 pt-2 container" >
                            {shouldShowBudget.map((item, index) => (
                            <li key={index}>
                            <NavLink to ={item.path} style={NavLinkStyle}>
                                <button type="button" className="btn btn" onClick={item.onClick}>{item.text}</button>
                            </NavLink>
                            </li>
                            ))}
                            </div>
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                    <NavLink to ="/quotation" style={NavLinkStyle}>
                        <button type="button" className="btn btn" onClick={() => {toggleQuotationList();toggleList()}}>Quotation</button>
                    </NavLink>
                    </li>
                    ))}
                    {isQuotationListVisible && (
                        <ul className="list-group list-group-flush">
                        <li className='list-group-item'>
                        <NavLink to ="/" style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleQuotationList();toggleList()}}>Quotation</button>
                        </NavLink>
                        </li>
                        <div className=" m-n1 pt-2 container" >
                        {shouldShowQuotation.map((item, index) => (
                        <li key={index}>
                        <NavLink to ={item.path} style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={item.onClick}>{item.text}</button>
                        </NavLink>
                        </li>
                        ))}
                        </div>
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                    <NavLink to ="/purchase" style={NavLinkStyle}>
                        <button type="button" className="btn btn" onClick={() => {togglePurchaseList();toggleList()}}>Purchase</button>
                    </NavLink>
                    </li>
                    ))}
                    {isPurchaseListVisible && (
                        <ul className="list-group list-group-flush">
                        <li className='list-group-item'>
                        <NavLink to ="/" style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={() => {togglePurchaseList();toggleList()}}>Purchase</button>
                        </NavLink>
                        </li>
                        <div className=" m-n1 pt-2 container" >
                        {shouldShowPurchase.map((item, index) => (
                        <li key={index}>
                        <NavLink to ={item.path} style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={item.onClick}>{item.text}</button>
                        </NavLink>
                        </li>
                        ))}
                        </div>
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                    <NavLink to ="/bills" style={NavLinkStyle}>
                        <button type="button" className="btn btn" onClick={() => {toggleBillsList();toggleList()}}>Bills</button>
                    </NavLink>
                    </li>
                    ))}
                    {isBillsListVisible && (
                        <ul className="list-group list-group-flush">
                        <li className='list-group-item'>
                        <NavLink to ="/" style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleBillsList();toggleList()}}>Bills</button>
                        </NavLink>
                        </li>
                        <div className=" m-n1 pt-2 container" >
                        {shouldShowBills.map((item, index) => (
                        <li key={index}>
                        <NavLink to ={item.path} style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={item.onClick}>{item.text}</button>
                        </NavLink>        
                        </li>
                        ))}
                        </div>
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                    <NavLink to ="/centraldeadstock" style={NavLinkStyle}>
                        <button type="button" className="btn btn" onClick={() => {toggleCDSList();toggleList()}}>Central Dead Stock</button>
                    </NavLink>
                    </li>
                    ))}
                    {isCDSListVisible && (
                        <ul className="list-group list-group-flush">
                        <li className='list-group-item'>
                        <NavLink to ="/" style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleCDSList();toggleList()}}>Central Dead Stock</button>
                        </NavLink>
                        </li>
                        <div className=" m-n1 pt-2 container" >
                        {shouldShowCDS.map((item, index) => (
                        <li key={index}>
                        <NavLink to ={item.path} style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={item.onClick}>{item.text}</button>
                        </NavLink>
                        </li>
                        ))}
                        </div>
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                    <NavLink to ="/feedback" style={NavLinkStyle}>
                        <button type="button" className="btn btn" onClick={() => {toggleFeedBackList();toggleList()}}>Feedback</button>
                    </NavLink>
                    </li>
                    ))}
                    {isFeedBackListVisible && (
                        <ul className="list-group list-group-flush">
                        <li className='list-group-item'>
                        <NavLink to ="/" style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={() => {toggleFeedBackList();toggleList()}}>Feedback</button>
                        </NavLink>
                        </li>
                        <div className=" m-n1 pt-2 container" >
                        {shouldShowFeedback.map((item, index) => (
                        <li key={index}>
                        <NavLink to ={item.path} style={NavLinkStyle}>
                            <button type="button" className="btn btn" onClick={item.onClick}>{item.text}</button>
                        </NavLink>
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
    </>
  )
}

// off canvas   
// scrollspy
// pagination
