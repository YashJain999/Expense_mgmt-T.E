import React,{ useState } from 'react';


export default function Sidebar() {
    // const [mainElement, setMainElement] = useState([
    //     { itemName:"Budget" , isSelected:"true"},
    //     { itemName:"Quotation" , isSelected:"true"},
    //     { itemName:"Purchase" , isSelected:"true"},
    //     { itemName:"Bills" , isSelected:"true"},
    //     { itemName:"Central Dead Stock" , isSelected:"true"} 
    // ]);

    // const [items, setItems] = useState([
    //     { itemName:"Enter Budget"},
    //     { itemName:"Generate Budget Report"},
    //     { itemName:"View Budget"},
    //     { itemName:"Financial Year Updation"},
    // ]);

    // const handleShowSubList = (index) =>{
    //     const updatedElement = [...mainElement]; // Create a copy of the items array
    //     updatedElement[index].isSelected =! updatedElement[index].isSelected;
    //     const updatedItems = [...items];
    //     setItems(updatedItems);
    //     setMainElement("");
    //     <>
    //     <button className="btn btn">Budget</button>
    //     <span className="fa-solid fa-chevron-right"></span>
    //         <div className="container">
    //             {mainElement.map((item,index) => (
    //                 item.isSelected ? (
    //                     <>
    //                         <ul className="list-group list-group-flush">
    //                             <div key={index}>
    //                                 {/* Render your JSX content here */}
    //                                 <li className="list-group-item">{item.itemName}</li>
    //                             </div>
    //                         </ul>
    //                         {console.log("subitems opened")}
    //                     </>)
    //                     :(
    //                         <span className="fa-solid fa-chevron-left"></span>
    //                     )
    //             ))}
    //         </div>
    //     </>
    // }
    // }

    //showing budget list
    const [shouldShowBudget, setShouldShowBudget] = useState([]); 
    const [isBudgetListVisible, setIsBudgetListVisible] = useState(false);
    const toggleBudgetList =() => {
    const buttonObject1 = ([
        {text:'Enter Budget'            ,onClick:()=>{alert("Enter budget was clicked")}},
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
            {text:'b.B1'            ,onClick:()=>{alert("bb1 was clicked")}},
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

    const [shouldShowList, setShouldShowList] = useState(true); 
    const toggleList =() => {
        setShouldShowList(!shouldShowList)  
    }

    return (
    <>
    <div className="offcanvas offcanvas-start show" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasLabel">LABTRACKER</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <ul className="list-group list-group-flush">
                    {shouldShowList && ((                
                    <li className='list-group-item'>
                        <button type="button" className="btn btn" onClick={() => {toggleBudgetList();toggleList()}}>Budget</button>
                        {/* <i class="fa-solid fa-chevron-left ms-5"></i> */}
                    </li>
                    ))}
                    {isBudgetListVisible && (
                        <ul className="list-group-item ">
                            <li>
                                <button type="button" className="btn btn" onClick={() => {toggleBudgetList();toggleList()}}>Budget</button>
                            </li>
                            {shouldShowBudget.map((item, index) => (
                            <li>
                                <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                            </li>
                            ))}
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                        <button type="button" className="btn btn" onClick={() => {toggleQuotationList();toggleList()}}>Quotation</button>
                    </li>
                    ))}
                    {isQuotationListVisible && (
                        <ul className="list-group-item ">
                        <li>
                            <button type="button" className="btn btn" onClick={() => {toggleQuotationList();toggleList()}}>Quotation</button>
                        </li>
                        {shouldShowQuotation.map((item, index) => (
                        <li>
                            <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                        </li>
                        ))}
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                        <button type="button" className="btn btn" onClick={() => {togglePurchaseList();toggleList()}}>Purchase</button>
                    </li>
                    ))}
                    {isPurchaseListVisible && (
                        <ul className="list-group-item ">
                        <li>
                            <button type="button" className="btn btn" onClick={() => {togglePurchaseList();toggleList()}}>Purchase</button>
                        </li>
                        {shouldShowPurchase.map((item, index) => (
                        <li>
                            <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                        </li>
                        ))}
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                        <button type="button" className="btn btn" onClick={() => {toggleBillsList();toggleList()}}>Bills</button>
                    </li>
                    ))}
                    {isBillsListVisible && (
                        <ul className="list-group-item ">
                        <li>
                            <button type="button" className="btn btn" onClick={() => {toggleBillsList();toggleList()}}>Bills</button>
                        </li>
                        {shouldShowBills.map((item, index) => (
                        <li>
                            <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                        </li>
                        ))}
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                        <button type="button" className="btn btn" onClick={() => {toggleCDSList();toggleList()}}>Central Dead Stock</button>
                    </li>
                    ))}
                    {isCDSListVisible && (
                        <ul className="list-group-item ">
                        <li>
                            <button type="button" className="btn btn" onClick={() => {toggleCDSList();toggleList()}}>Central Dead Stock</button>
                        </li>
                        {shouldShowCDS.map((item, index) => (
                        <li>
                            <button type="button" className="btn btn" key={index} onClick={item.onClick}>{item.text}</button>
                        </li>
                        ))}
                        </ul>
                    )}
                    {shouldShowList && ((
                    <li className="list-group-item">
                        <button type="button" className="btn btn" onClick={toggleList}>Feedback</button>
                    </li>
                    ))}
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
