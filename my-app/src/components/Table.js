import React from 'react';

const Table = ({ data }) => {
  const itemNames = {
    'LAB-CONSUME': 'Laboratory Consumables',
    'LAB-EQ': 'Laboratory Equipment',
    'MAINT-SPARE': 'Maintenance and Spares',
    'MISC': 'Miscellaneous expenses',
    'RND': 'Research and Development',
    'SOFT': 'Software',
    'T&T': 'Training and Travel'
  };
  // Extract unique financial years
  const uniqueYears = Array.from(new Set(data.map(item => item.f_year))).sort();

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
      const rowCells = [<td key={`${item}-name`}>{itemNames[item]}</td>];
      uniqueYears.forEach(year => {
        const data = items[item][year] || { budgeted_amt: 0, actual_exp: 0 };
        rowCells.push(
          <React.Fragment key={`${item}-${year}`}>
            <td>{data.budgeted_amt}</td>
            <td>{data.actual_exp}</td>
          </React.Fragment>
        );
      });
      rows.push(<tr key={`${item}-row`}>{rowCells}</tr>);
    });

    return rows;
  };

  return (
    <div>
      <h2>Budget Data</h2>
      <table>
        <thead>
          <tr>
            <th>Items</th>
            {uniqueYears.map(year => (
              <React.Fragment key={year}>
                <th>Budgeted Amount {year}</th>
                <th>Actual Expense {year}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            {uniqueYears.map(year => (
              <React.Fragment key={year}>
                <td>{totals[year].budgeted_amt}</td>
                <td>{totals[year].actual_exp}</td>
              </React.Fragment>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
