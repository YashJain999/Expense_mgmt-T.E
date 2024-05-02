import React from 'react';
import TableComponent from './TableComponent';

const Table = ({ data, caption }) => {
  const itemNames = {
    'LAB-CONSUME': 'Laboratory Consumables',
    'LAB-EQ': 'Laboratory Equipment',
    'MAINT-SPARE': 'Maintenance and Spares',
    'MISC': 'Miscellaneous expenses',
    'RND': 'Research and Development',
    'SOFT': 'Software',
    'T&T': 'Training and Travel'
  };
  // Extract unique financial years and reverse them
  const uniqueYears = Array.from(new Set(data.map(item => item.f_year))).sort().reverse();

  // Organize data by item
  const items = {};
  data.forEach(({ item, f_year, budgeted_amt, actual_exp }) => {
    if (!items[item]) {
      items[item] = {};
    }
    items[item][f_year] = { budgeted_amt, actual_exp };
  });

  // Initialize totals for each year
  const totals = {};
  uniqueYears.forEach(year => {
    totals[year] = { budgeted_amt: 0, actual_exp: 0 };
  });

  // Calculate totals for each year
  Object.values(items).forEach(itemData => {
    uniqueYears.forEach(year => {
      if (itemData[year]) {
        totals[year].budgeted_amt += itemData[year].budgeted_amt;
        totals[year].actual_exp += itemData[year].actual_exp;
      }
    });
  });

  // Function to generate table rows
  const generateRows = () => {
    const rows = [];
    // Items in the order you specified
    const orderedItems = ['LAB-CONSUME', 'LAB-EQ', 'MAINT-SPARE', 'MISC', 'RND', 'SOFT', 'T&T'];

    orderedItems.forEach(item => {
      let row = []
      let rowCell1 = {}
      // const rowCells = [<td key={`${item}-name`}>{itemNames[item]}</td>];
      rowCell1["item"] = item;
      rowCell1["styles"] = {width: "300px"};
      rowCell1["className"] = "bg-primary text-white text-start";
      row.push(rowCell1);
      uniqueYears.forEach(year => {
        const data = items[item][year] || { budgeted_amt: 0, actual_exp: 0 };
        let rowCellBudget_amt = {}
        rowCellBudget_amt["item"] = data.budgeted_amt;
        rowCellBudget_amt["styles"] = {};
        rowCellBudget_amt["className"] = "";
        row.push(rowCellBudget_amt)

        let rowCellActual_exp = {}
        rowCellActual_exp["item"] = data.actual_exp;
        rowCellActual_exp["styles"] = {};
        rowCellActual_exp["className"] = "";
        row.push(rowCellActual_exp)
      });
      rows.push(row);
    });

    return rows;
  };

  return (
    <div className='w-100 h-100'>
      <TableComponent
        caption={caption}
        thData={[{ text: "Items" },
        ...uniqueYears.flatMap(year =>
          [{ text: "Budget Amount" + year }, { text: "Actual Expense" + year }]
        )
        ]}
        tbData={generateRows()}
        tfData={[{ text: "Total" },
        ...uniqueYears.flatMap(year => (
          [{ text: totals[year].budgeted_amt.toString() }, { text: totals[year].actual_exp.toString() }]
        ))]}
      />
    </div>
  );
};

export default Table;
